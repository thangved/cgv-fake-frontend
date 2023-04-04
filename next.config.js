const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	productionBrowserSourceMaps: false,
};

module.exports = withBundleAnalyzer(nextConfig);
