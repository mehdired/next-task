import Card from './Card'
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
			{pages.map((page) => (
				<SidebarLink key={page.label.toLowerCase()} page={page} />
			))}
		</Card>
	)
}

export default Sidebar
