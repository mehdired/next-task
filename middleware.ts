import { JWTType } from './lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_FILE = /\.(.*)$/

const verifyJWT = async (token: JWTType) => {
	const { payload } = await jwtVerify(
		token.value,
		new TextEncoder().encode(process.env.JWT_SECRET)
	)

	return payload
}

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/static') ||
		pathname.startsWith('/signin') ||
		pathname.startsWith('/register') ||
		PUBLIC_FILE.test(pathname)
	) {
		return NextResponse.next()
	}

	const jwt = req.cookies.get(process.env.JWT_COOKIE_NAME)

	if (!jwt) {
		req.nextUrl.pathname = '/signin'
		return NextResponse.redirect(req.nextUrl)
	}

	try {
		await verifyJWT(jwt)
		return NextResponse.next()
	} catch (e) {
		console.error(e)
		req.nextUrl.pathname = '/signin'
		return NextResponse.redirect(req.nextUrl)
	}
}
