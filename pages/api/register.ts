import { NextApiRequest, NextApiResponse } from 'next'
import { generateJWT } from './../../lib/auth'
import { hashPassword } from '@/lib/auth'
import { db } from '@/lib/db'
import { serialize } from 'cookie'

export default async function register(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(401)
		res.json({})
		res.end()
		return
	}

	const user = await db.user.create({
		data: {
			name: req.body.name,
			email: req.body.email,
			password: await hashPassword(req.body.password)
		}
	})

	const jwt = await generateJWT(user)
	res.setHeader(
		'Set-Cookie',
		serialize(process.env.JWT_COOKIE_NAME, jwt, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		})
	)

	res.status(201)
	res.json({})
	res.end()
}
