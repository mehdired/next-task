import { db } from './../../lib/db'
import { verifyJWT } from '@/lib/auth'
import { UserType } from '@/types/types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cookieName = process.env.JWT_COOKIE_NAME

	const user = cookieName ? await verifyJWT(req.cookies[cookieName]) : null

	if (!user) {
		res.status(401).json({ error: 'Unauthorized' })
		return
	}

	await db.project.create({
		data: {
			name: req.body.name,
			ownerId: user.id
		}
	})

	res.json({ data: { message: 'ok' } })
}
