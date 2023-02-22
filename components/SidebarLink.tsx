'use client'

import Link from 'next/link'
import { FiSettings, FiUser, FiGrid, FiCalendar } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { IconType } from 'react-icons'

const icons: { [key: string]: IconType } = {
	FiSettings,
	FiUser,
	FiGrid,
	FiCalendar
}

type Props = {
	page: {
		label: string
		icon: string
		link: string
	}
}

export default function SidebarLink({ page }: Props) {
	const pathname = usePathname()
	const isActive = pathname === page.link ?? false

	const Icon = icons[page.icon]

	return (
		<Link
			href={page.link}
			className="w-full flex justify-center items-center"
		>
			<Icon
				size={40}
				className={clsx(
					'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
					isActive && 'stroke-violet-600'
				)}
			/>
		</Link>
	)
}
