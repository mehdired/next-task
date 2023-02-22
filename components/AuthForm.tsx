'use client'

import { ChangeEvent, SyntheticEvent, useState } from 'react'

import { signin, register, UserType } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Card from './Card'
import Input from './Input'
import Button from './Button'

const registerContent = {
	linkUrl: '/signin',
	linkText: 'Already have an account?',
	header: 'Create a new Account',
	subheader: 'Just a few things to get started',
	buttonText: 'Register'
}

const signinContent = {
	linkUrl: '/register',
	linkText: "Don't have an account?",
	header: 'Welcome Back',
	subheader: 'Enter your credentials to access your account',
	buttonText: 'Sign In'
}

const initialState = { name: '', email: '', password: '' }

type Props = {
	mode: 'register' | 'signin'
}

export default function AuthForm({ mode }: Props) {
	const [formState, setFormState] = useState<UserType>(initialState)
	const router = useRouter()

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (mode === 'register') {
			await register(formState)
		} else {
			await signin(formState)
		}

		setFormState(initialState)
		router.replace('/home')
	}

	const content = mode === 'register' ? registerContent : signinContent

	return (
		<Card className="w-[550px] max-w-full mx-5">
			<div className="w-full">
				<div className="text-center">
					<h2 className="text-3xl mb-2">{content.header}</h2>
					<p className="tex-lg text-black/25">{content.subheader}</p>
				</div>
				<form onSubmit={handleSubmit} className="py-10 w-full">
					{mode === 'register' && (
						<div className="mb-8">
							<div className="text-lg mb-4 ml-2 text-black/50">
								Name
							</div>
							<Input
								required
								placeholder="First Name"
								value={formState.name}
								className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
								onChange={(
									event: ChangeEvent<HTMLInputElement>
								) =>
									setFormState((prevState) => ({
										...prevState,
										name: event.target.value
									}))
								}
							/>
						</div>
					)}
					<div className="mb-8">
						<div className="text-lg mb-4 ml-2 text-black/50">
							Email
						</div>
						<Input
							required
							type="email"
							placeholder="Email"
							value={formState.email}
							className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setFormState((prevState) => ({
									...prevState,
									email: event.target.value
								}))
							}
						/>
					</div>
					<div className="mb-8">
						<div className="text-lg mb-4 ml-2 text-black/50">
							Password
						</div>
						<Input
							required
							value={formState.password}
							type="password"
							placeholder="Password"
							className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setFormState((prevState) => ({
									...prevState,
									password: event.target.value
								}))
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<span>
								<Link
									href={content.linkUrl}
									className="text-blue-600 font-bold"
								>
									{content.linkText}
								</Link>
							</span>
						</div>
						<div>
							<Button intent="secondary">
								{content.buttonText}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Card>
	)
}
