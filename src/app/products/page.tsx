import { ProductList } from '@/views/products/ui'
import { SessionGuard } from '@/shared/ui'
import { ProductsStoreProvider } from '@/views/products/models'

// export const dynamic = 'force-dynamic'

export default async function Page() {
	return (
		<SessionGuard>
			<ProductsStoreProvider>
				<ProductList />
			</ProductsStoreProvider>
		</SessionGuard>
	)
}
