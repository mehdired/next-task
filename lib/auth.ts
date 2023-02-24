import bcrypt from 'bcrypt'
import { SignJWT, jwtVerify } from 'jose'
import { UserType } from '@/types/types'
import { db } from './db'

export const hashPassword = (password: string) => bcrypt.hash(password, 10)

const comparePasswords = (plainPwd: string, hashedPwd: string) =>
	bcrypt.compare(plainPwd, hashedPwd)

export const generateJWT = (user: UserType) => {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + 60 * 60 * 24 * 7 // 7 days

	return new SignJWT({ payload: { id: user.id, email: user.email } })
		.setProtectedHeader({ alg: 'HSZ56', typ: 'JWT' })
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.setExpirationTime(exp)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifyJWT = async (token: string) => {
	const { payload } = await jwtVerify(
		token,
		new TextEncoder().encode(process.env.JWT_SECRET)
	)

	return payload.payload
}

export const getUserFromCookie = async (cookies) => {
	const jwt = cookies.get(process.env.JWT_COOKIE_NAME)

	const { id } = (await verifyJWT(jwt)) as { id: string }

	const user = await db.user.findUnique({
		where: {
			id
		}
	})

	return user
}
