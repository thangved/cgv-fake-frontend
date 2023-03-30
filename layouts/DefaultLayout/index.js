/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { Roboto } from 'next/font/google';

import Header from './components/Header';
import Footer from './components/Footer';
import styles from './DefalutLayout.module.css';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['vietnamese'],
});

const DefaultLayout = ({ children }) => {
	return (
		<div className={clsx(styles.wrapper, roboto.className)}>
			<Header />
			<div className={styles.content}>{children}</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
