import { getUserFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProjectCard from './ProjectCard'

type Props = {}

const getData = async () => {
	const user = await getUserFromCookie(cookies())

	const projects = await db.project.findMany({
		where: {
			ownerId: user?.id
		},
		include: {
			tasks: true
		}
	})

	return { projects }
}

export default async function ProjectCardList({}: Props) {
	const { projects } = await getData()

	return (
		<div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
			{projects.map((project) => (
				<div className="w-1/3 p-3" key={project.id}>
					<Link href={`/project/${project.id}`}>
						<ProjectCard project={project} />
					</Link>
				</div>
			))}
		</div>
	)
}
