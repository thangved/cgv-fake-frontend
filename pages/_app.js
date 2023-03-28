import DefaultLayout from '@/layouts/DefaultLayout';
import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	const Layout = Component.layout || DefaultLayout;

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
