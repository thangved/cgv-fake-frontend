/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/_404.module.css';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { Tomorrow } from 'next/font/google';
import clsx from 'clsx';
import Button from '@/components/Button';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const tomorrow = Tomorrow({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

const _404 = () => {
	const wrapperRef = useRef();
	const currentUser = useSelector((state) => state.user.value);

	useEffect(() => {
		const interval = setInterval(createStar, 100);

		function createStar() {
			var right = Math.random() * 500;
			var top = Math.random() * screen.height;
			var star = document.createElement('div');
			star.classList.add(styles.star);
			wrapperRef.current.appendChild(star);
			setInterval(runStar, 10);
			star.style.top = top + 'px';
			function runStar() {
				if (right >= screen.width) {
					star.remove();
				}
				right += 3;
				star.style.right = right + 'px';
			}
		}

		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<Head>
				<title>404 - Không tìm thấy trang</title>
			</Head>
			<div
				className={clsx(styles.wrapper, tomorrow.className)}
				ref={wrapperRef}
			>
				<div className={styles.text}>
					<div>ERROR</div>
					<h1>404</h1>
					<hr />
					<div>Khong tim thay trang</div>
					<Link href="/" style={{ marginTop: 10, display: 'block' }}>
						<Button outlined>TRANG CHU</Button>
					</Link>

					{currentUser?.admin && (
						<Link href="/acp">
							<Button outlined>ACP</Button>
						</Link>
					)}
				</div>

				<div className={styles.astronaut}>
					<img
						src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
						alt=""
						className={styles.src}
					/>
				</div>
			</div>
		</>
	);
};

_404.layout = ({ children }) => children;

export default _404;
