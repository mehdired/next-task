import { db } from '@/lib/db'
import { TaskStatus } from '@prisma/client'

const getRandomeStatus = () => {
	const statuses = Object.values(TaskStatus)
	return statuses[Math.floor(Math.random() * statuses.length)]
}

async function main() {
	const user = await db.user.upsert({
		where: { email: 'user@mail.ca' },
		update: {},
		create: {
			email: 'user@mail.ca',
			name: 'User',
			password: 'password',
			projects: {
				create: new Array(10).fill(0).map((_, i) => ({
					name: `Project ${i}`,
					due: new Date(2023, 1, 1)
				}))
			}
		},
		include: {
			projects: true
		}
	})

	const tasks = await Promise.all(
		user.projects.map((project) =>
			db.task.createMany({
				data: new Array(10).fill(1).map((_, i) => {
					return {
						name: `Task ${i}`,
						ownerId: user.id,
						projectId: project.id,
						description: `Everything that describes Task ${i}`,
						status: getRandomeStatus(),
						due: new Date(2023, 12, 25)
					}
				})
			})
		)
	)
}

main()
	.then(async () => {
		await db.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await db.$disconnect()
		process.exit(1)
	})
