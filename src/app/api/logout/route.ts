import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	const cookiesStore = await cookies()
	cookiesStore.set('refreshToken', '', { httpOnly: true, secure: true, path: '/', maxAge: 0 })
	return NextResponse.json({ message: 'Logged out successfully' })
}
