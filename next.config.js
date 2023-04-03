/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	productionBrowserSourceMaps: false,
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
