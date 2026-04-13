import { AxiosError } from 'axios'
import { axiosInstance } from '@/shared/lib'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const cookiesStore = await cookies()
		const refreshToken = cookiesStore.get('refreshToken')?.value

		if (!refreshToken) {
			return NextResponse.json({ message: 'Refresh token not found' }, { status: 401 })
		}

		const response = await axiosInstance.post('/auth/refresh', { refreshToken })
		cookiesStore.set('refreshToken', response.data.refreshToken, { httpOnly: true, secure: true, path: '/', maxAge: 60 * 60 * 24 * 30 })
	
		return NextResponse.json(response.data.accessToken)
	} catch (error) {
		if (!(error instanceof AxiosError)) throw error
		return NextResponse.json({ message: error.message }, { status: error.status })
	}
}
