import React from 'react'
import GlassPane from '@/components/GlassPane'

type Props = {
	children: React.ReactNode
}

export default function DashboardRootLayout({ children }: Props) {
	return (
		<html>
			<head />
			<body className="h-screen w-screen rainbow-mesh">
				<GlassPane className="w-full h-full">{children}</GlassPane>
			</body>
		</html>
	)
}
