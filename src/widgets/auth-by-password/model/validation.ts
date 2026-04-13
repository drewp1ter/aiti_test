import { z } from 'zod'

export const authSchema = z.object({
	username: z
		.string()
		.min(1, 'Логин обязателен')
		.min(3, 'Логин должен содержать минимум 3 символа')
		.max(50, 'Логин должен содержать максимум 50 символов'),
	password: z
		.string()
		.min(1, 'Пароль обязателен')
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(100, 'Пароль должен содержать максимум 100 символов'),
	remember: z.boolean().optional()
})

export type AuthFormData = z.infer<typeof authSchema>

// Функция для форматирования ошибок валидации
export const formatValidationErrors = (error: z.ZodError): Partial<Record<keyof AuthFormData, string>> => {
	const fieldErrors: Partial<Record<keyof AuthFormData, string>> = {}
	
	error.issues.forEach((err) => {
		const field = err.path[0] as keyof AuthFormData
		if (field) {
			fieldErrors[field] = err.message
		}
	})
	
	return fieldErrors
}