import '@/styles/global.css'

import clsx from 'clsx'
import React from 'react'

type GlassPaneProps = {
	children: React.ReactNode
	className: string
}

export default function GlassPane({ children, className }: GlassPaneProps) {
	return (
		<div
			className={clsx(
				'glass rounded-2xl border-solid border-2 border-gray-200',
				className
			)}
		>
			{children}
		</div>
	)
}
