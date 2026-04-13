'use client'

import { useState, useEffect, useReducer, useTransition, useActionState } from 'react'
import { Input, Label, Button, Icon, Checkbox } from '@/shared/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import cn from 'clsx'
import { toast } from 'react-toastify'
import { type AuthFormData } from '../../model/validation'
import { loginAction } from '../../lib/loginAction'
import Logo from './Logo.svg'
import styles from './AuthByPassword.module.scss'

interface Props {
	className?: string
}

export const AuthByPassword = ({ className }: Props) => {
	const router = useRouter()
	const [formState, formAction] = useActionState(loginAction, { timestamp: 0 })
	const [isPending, startTransition] = useTransition()
	const [showPassword, toggleShowPassword] = useReducer((show) => !show, false)
	const [formData, setFormData] = useState<AuthFormData>({
		username: '',
		password: '',
		remember: false,
	})

	useEffect(() => {
		if (formState.errors) {
			const message = formState.errors.reduce((acc, error) => {
				if (error.message) {
					acc += `${error.message}\n`
				}
				return acc
			}, '')
			toast.error(message)
		}

		if (formState.accessToken) {
		  if (formData.remember) {
				localStorage.setItem('accessToken', formState.accessToken)
			} else {
				sessionStorage.setItem('accessToken', formState.accessToken)
			}

      router.push('/products')
		}
	}, [formState.timestamp])

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	const handleSubmit = (formData: FormData) => {
		startTransition(() => {
			formAction(formData)
		})
	}

	const fieldHasError = (field: keyof AuthFormData) => {
		return formState.errors?.some((error) => error.field === field)
	}

	return (
		<section className={cn(styles.wrapper, className)}>
			<div className={styles.login}>
				<div className={styles.logoWrapper}>
					<Logo />
				</div>
				<h1 className={styles.title}>Добро пожаловать!</h1>
				<h2 className={styles.subtitle} data-text="Пожалуйста, авторизируйтесь">
					Пожалуйста, авторизируйтесь
				</h2>

				<form action={handleSubmit} className="w-full">
					<Label.Top title="Логин" className="mt-8 w-full">
						<Input
							name="username"
							value={formData.username}
							onChange={handleChange}
							variantSize="55"
							variant={fieldHasError('username') ? 'danger' : 'primary'}
						>
							<Input.Prefix>
								<Icon.User />
							</Input.Prefix>
							{formData.username && (
								<Input.Suffix
									className="cursor-pointer"
									onClick={() => setFormData((prev) => ({ ...prev, username: '' }))}
								>
									<Icon.Close />
								</Input.Suffix>
							)}
						</Input>
					</Label.Top>

					<Label.Top title="Пароль" className="mt-4 w-full">
						<Input
							name="password"
							value={formData.password}
							onChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							variantSize="55"
							variant={fieldHasError('password') ? 'danger' : 'primary'}
						>
							<Input.Prefix>
								<Icon.Lock />
							</Input.Prefix>
							<Input.Suffix className="cursor-pointer" onClick={toggleShowPassword}>
								<Icon.EyeOff />
							</Input.Suffix>
						</Input>
					</Label.Top>

					<Label.Right title="Запомнить данные" variant="secondary" className="mt-5 cursor-pointer self-start">
						<Checkbox name="remember" checked={formData.remember} onChange={handleChange} />
					</Label.Right>

					<Button type="submit" className="mt-5 w-full" variant="primary" variantSize="54" disabled={isPending} loading={isPending}>
						Войти
					</Button>
				</form>

				<div className={styles.divider}>Или</div>
				<div className={styles.footer}>
					Нет аккаунта?{' '}
					<Link href="#" className={styles.link}>
						Создать
					</Link>
				</div>
			</div>
		</section>
	)
}
