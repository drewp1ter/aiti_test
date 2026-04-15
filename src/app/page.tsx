export const dynamic = 'force-dynamic'
import { SessionGuard } from '@/shared/ui'
import Link from 'next/link'

export default async function Page() {
	return (
		<SessionGuard>
			<div className='p-5 flex flex-col gap-4'>
				<h1>Home Page</h1>
				<p>Welcome to the home page!</p>
				<Link href="/products">Go to Products</Link>
			</div>
		</SessionGuard>
	)
}
