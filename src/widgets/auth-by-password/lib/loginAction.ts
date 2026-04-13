'use server'

import { AxiosError } from 'axios'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { authSchema, type AuthFormData } from '../model/validation'
import { DTO } from '../types'
import { login } from '../api'

interface FormError {
	field: keyof AuthFormData | 'bad_request' | 'unknown'
	message?: string
}

interface FormState extends Partial<Pick<DTO.Response.Login, 'accessToken'>> {
	errors?: FormError[]
	timestamp: number
}

export async function loginAction(_prevState: FormState, formData: FormData): Promise<FormState> {
	const remember = formData.get('remember') === 'on' 
	const data: DTO.Request.Login = {
		username: String(formData.get('username') ?? '').trim(),
		password: String(formData.get('password') ?? ''),
	}

	let res: DTO.Response.Login | null = null
	try {
		authSchema.parse(data)
		res = await login(data)
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.issues.reduce((acc, issue) => {
				const field = issue.path[0] as keyof AuthFormData
				acc.push({ field, message: issue.message })
				return acc
			}, [] as FormError[])
			return { errors, timestamp: Date.now() }
		}

		if (error instanceof AxiosError) {
			return {
				errors: [{ field: 'bad_request', message: error.response?.data?.message || 'Что то пошло не так...' }],
				timestamp: Date.now(),
			}
		}
	}

	if (!res) {
		return { errors: [{ field: 'unknown', message: 'Что то пошло не так...' }], timestamp: Date.now() }
	}

	const cookiesStore = await cookies()
	const maxAge = remember ? 60 * 60 * 24 * 30 : undefined
	cookiesStore.set('refreshToken', res.refreshToken, { httpOnly: true, secure: true, path: '/', maxAge })

	return { accessToken: res.accessToken, timestamp: Date.now() }
}
