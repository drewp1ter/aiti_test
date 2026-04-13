'use client'

import { Input, Label, Button, Icon, Checkbox } from '@/shared/ui'
import Link from 'next/link'
import cn from 'clsx'
import Logo from './Logo.svg'
import styles from './AuthByPassword.module.scss'

interface Props {
	className?: string
}

export const AuthByPassword = ({ className }: Props) => {
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
				<Label.Top title="Логин" className="mt-8 w-full">
					<Input variantSize="55" variant="primary">
						<Input.Prefix>
							<Icon.User />
						</Input.Prefix>
						<Input.Suffix className="cursor-pointer">
							<Icon.Close />
						</Input.Suffix>
					</Input>
				</Label.Top>
				<Label.Top title="Пароль" className="mt-4 w-full">
					<Input type="password" variantSize="55" variant="primary">
						<Input.Prefix>
							<Icon.Lock />
						</Input.Prefix>
						<Input.Suffix className="cursor-pointer">
							<Icon.EyeOff />
						</Input.Suffix>
					</Input>
				</Label.Top>
				<Label.Right title="Запомнить данные" variant="secondary" className="mt-5 cursor-pointer self-start">
					<Checkbox />
				</Label.Right>
				<Button className="mt-5 w-full" variant="primary" variantSize="54">Войти</Button>
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
