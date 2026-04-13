import { ProductList } from "@/views/products/ui"
import { SessionGuard } from '@/shared/ui'

export default async function Page() {
  return (
    <SessionGuard>
      <ProductList />
    </SessionGuard>
  )
}