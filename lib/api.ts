type FetcherType = {
	url: string
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	body?: any
	json?: boolean
}

type User = {
	name: string
	email: string
	password: string
}

export const fetcher = async ({
	url,
	method,
	body,
	json = true
}: FetcherType) => {
	const res = await fetch(url, {
		method,
		body: body && JSON.stringify(body),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})

	if (!res.ok) {
		throw new Error('An error occurred while fetching the data.')
	}

	if (json) {
		const data = await res.json()
		return data.data
	}
}

export const register = async (user: User) => {
	return fetcher({ url: '/api/register', method: 'POST', body: user })
}

export const signin = async (user: User) => {
	return fetcher({ url: '/api/signin', method: 'POST', body: user })
}