import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
	images: {
    remotePatterns: [new URL('https://cdn.dummyjson.com/**')],
  },
}

export default nextConfig
