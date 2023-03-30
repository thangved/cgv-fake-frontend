import {
	faAngleDown,
	faAngleLeft,
	faFilm,
	faHome,
	faHouse,
	faLocation,
	faTicket,
	faUsers,
	faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './AcpLayout.module.css';

export const adminNavItems = [
	{
		title: 'Giới tính',
		path: 'genders',
		icon: <FontAwesomeIcon icon={faVenusMars} />,
		children: [
			{
				title: 'Thêm',
				path: 'create',
			},
		],
	},
	{
		title: 'Tài khoản',
		path: 'accounts',
		icon: <FontAwesomeIcon icon={faUsers} />,
	},
	{
		title: 'Tỉnh thành',
		path: 'provinces',
		icon: <FontAwesomeIcon icon={faLocation} />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Rạp',
		path: 'cinemas',
		icon: <FontAwesomeIcon icon={faHouse} />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Phim',
		path: 'movies',
		icon: <FontAwesomeIcon icon={faFilm} />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Suất chiếu',
		path: 'shows',
		icon: <FontAwesomeIcon icon={faTicket} />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
];

const Item = ({ item }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className={styles.item} key={item.path}>
				{item.icon}{' '}
				<Link href={`/acp/${item.path}`} className={styles.text}>
					{item.title}
				</Link>
				{item.children && (
					<span
						onClick={() => setOpen(!open)}
						className={clsx(styles.btn, {
							[styles.open]: open,
						})}
					>
						<FontAwesomeIcon icon={faAngleDown} />
					</span>
				)}
			</div>
			{open && (
				<>
					{item.children.map((e) => (
						<Link
							className={styles.child}
							key={e.path}
							href={`/acp/${item.path}/${e.path}`}
						>
							{e.title}
						</Link>
					))}
				</>
			)}
		</>
	);
};

const AcpLayout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>CGV Fake ACP</title>
			</Head>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.back} onClick={() => router.back()}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</div>

					<div
						className={styles.back}
						onClick={() => router.push('/')}
					>
						<FontAwesomeIcon icon={faHome} />
					</div>

					<Link href="/acp">
						<h4>CGV Fake ACP</h4>
					</Link>
				</div>
				<div className={styles.main}>
					<div className={styles.sidebar}>
						{adminNavItems.map((e) => (
							<Item key={e.path} item={e} />
						))}
					</div>
					<div className={styles.content}>{children}</div>
				</div>
			</div>
		</>
	);
};

export default AcpLayout;
