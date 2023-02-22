import Card from './Card'
import Image from 'next/image'
import logo from '@/assets/images/logo.png'
import SidebarLink from './SidebarLink'

const pages = [
	{ label: 'Home', icon: 'FiGrid', link: '/home' },
	{
		label: 'Calendar',
		icon: 'FiCalendar',
		link: '/calendar'
	},
	{ label: 'Profile', icon: 'FiUser', link: '/profile' },
	{
		label: 'Settings',
		icon: 'FiSettings',
		link: '/settings'
	}
]

const Sidebar = () => {
	return (
		<Card className="h-full w-40 flex items-center justify-between flex-wrap">
			<div className="w-full flex justify-center items-center">
				<Image src={logo} alt="Able logo" priority className="w-14" />
			</div>
			{pages.map((page) => (
				<SidebarLink key={page.label.toLowerCase()} page={page} />
			))}
		</Card>
	)
}

export default Sidebar
