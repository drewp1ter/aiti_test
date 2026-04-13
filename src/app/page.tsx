export const dynamic = 'force-dynamic'
import { SessionGuard } from '@/shared/ui'

export default async function Page() {
	return (
		<SessionGuard>
			<div />
		</SessionGuard>
	)
}
