import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { UserType } from '@/types/types'
import { db } from './db'
import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

export type JWTType = {
	name: string
	value: string
}

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

export const comparePasswords = (plainPwd: string, hashedPwd: string) =>
	bcrypt.compare(plainPwd, hashedPwd)

export const generateJWT = (user: UserType) => {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + 60 * 60 * 24 * 7 // 7 days

	return new SignJWT({ payload: { id: user.id, email: user.email } })
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.setExpirationTime(exp)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifyJWT = async (jwtValue: string) => {
	const { payload } = await jwtVerify(
		jwtValue,
		new TextEncoder().encode(process.env.JWT_SECRET)
	)

	return payload.payload
}

export const getUserFromCookie = async (
	cookies: ReadonlyRequestCookies | RequestCookies
) => {
	const jwt = cookies.get(process.env.JWT_COOKIE_NAME)

	if (!jwt) return null

	const { id } = (await verifyJWT(jwt.value)) as { id: string }

	const user = await db.user.findUnique({
		where: {
			id
		}
	})

	return user
}
