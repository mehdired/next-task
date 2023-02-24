export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string
			JWT_SECRET: string
			JWT_COOKIE_NAME: string
			NODE_ENV: 'development' | 'production'
		}
	}
}
