const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	productionBrowserSourceMaps: false,
	modularizeImports: {
		'@mui/material': {
			transform: '@mui/material/{{member}}',
		},
		'@mui/icons-material': {
			transform: '@mui/icons-material/{{member}}',
		},
	},
	async rewrites() {
		return [
			{
				source: '/api/static/uploads/:path',
				destination: `${process.env.NEXT_PUBLIC_BACKENDURL}static/uploads/:path`,
				basePath: false,
			},
		];
	},
};

module.exports = withBundleAnalyzer(nextConfig);
