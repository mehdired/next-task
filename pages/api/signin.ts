import { comparePasswords, generateJWT } from '@/lib/auth'
import { db } from '@/lib/db'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function signin(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		res.status(401).end()
		return
	}

	const user = await db.user.findUnique({
		where: {
			email: req.body.email
		}
	})

	if (!user) {
		res.status(401)
		res.json({ error: 'Invalid login' })
		res.end()
		return
	}

	const isUser = await comparePasswords(req.body.password, user.password)

	if (isUser) {
		const jwt = await generateJWT(user)
		res.setHeader(
			'Set-Cookie',
			serialize(process.env.JWT_COOKIE_NAME, jwt, {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			})
		)
	}

	res.status(201).end()
}
