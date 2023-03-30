/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { Cabin } from 'next/font/google';

import Footer from './components/Footer';
import Header from './components/Header';
import styles from './DefalutLayout.module.css';

const cabin = Cabin({
	weight: ['400', '500', '600', '700'],
	subsets: ['vietnamese'],
});

const DefaultLayout = ({ children }) => {
	return (
		<div className={clsx(styles.wrapper, cabin.className)}>
			<Header />
			<div className={styles.content}>{children}</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
