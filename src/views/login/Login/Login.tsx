import { AuthByPassword } from '@/widgets/auth-by-password'

export const Login = () => {
	return (
		<div className="size-full relative bg-[#F9F9F9]">
			<AuthByPassword className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
		</div>
	)
}
