/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['bcrypt'],
		fontLoaders: [
			{ loader: '@next/font/google', options: { subsets: ['latin'] } }
		]
	},
	typescript: {
		ignoreBuildErrors: true
	},
	eslint: {
		ignoreDuringBuilds: true
	}
}

module.exports = nextConfig
