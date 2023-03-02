import { getUserFromCookie } from '@/lib/auth'
import { cookies } from 'next/headers'
import { delay } from '@/lib/delay'
import Button from './Button'
import Card from './Card'

const getData = async () => {
	const user = await getUserFromCookie(cookies())
	return user
}

export default async function Greetings() {
	const user = await getData()

	if (!user) return null

	return (
		<Card className="w-full py-4 relative">
			<div className="mb-4">
				<h1 className="text-3xl text-gray-700 font-bold mb-4">
					Hi, {user.name}!
				</h1>
				<h4 className="text-xl text-gray-400">
					Check your daily tasks and schedule
				</h4>
			</div>
			<div>
				<Button size="large">Today&apos;s Schedule</Button>
			</div>
		</Card>
	)
}
