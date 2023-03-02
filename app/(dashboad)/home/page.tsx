import Link from 'next/link'
import { Suspense } from 'react'
import { delay } from '@/lib/delay'
import { getUserFromCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import Greetings from '@/components/Greetings'
import GreetingsSkeleton from '@/components/GreetingsLoader'
import ProjectCardList from '@/components/ProjectCardList'
import TaskCard from '@/components/TaskCard'

export default async function Page() {
	return (
		<div className="h-full overflow-y-auto pr-6 w-1/1">
			<div className=" h-full  items-stretch justify-center min-h-[content]">
				<div className="flex-1 grow flex">
					<Suspense fallback={<GreetingsSkeleton />}>
						{/* @ts-expect-error Server Component */}
						<Greetings />
					</Suspense>
				</div>
				{/* @ts-expect-error Server Component */}
				<ProjectCardList />
				<div className="w-1/3 p-3">{/* new project here */}</div>
				<div className="w-full">
					{/* @ts-expect-error Server Component */}
					<TaskCard title="Tasks" />
				</div>
			</div>
		</div>
	)
}
