import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  if (!request.cookies.has('refreshToken')) {
	  return NextResponse.redirect(new URL('/login', request.url))
	}	
	return NextResponse.next({ request })
}

export const config = {
	matcher: ['/', '/products'],
}
