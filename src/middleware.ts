import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	request.headers.append('x-pathname', request.nextUrl.pathname)
	request.headers.append('x-search-params', request.nextUrl.searchParams.toString())
	return NextResponse.next({ request })
}

export const config = {
	matcher: ['/'],
}
