import LoadingOverlay from '@/components/LoadingOverlay';
import {
	AccountCircleOutlined,
	ArrowBackIosNewOutlined,
	ArrowDropDownOutlined,
	CalendarMonthOutlined,
	ChairOutlined,
	HomeOutlined,
	KeyboardDoubleArrowLeftOutlined,
	KeyboardDoubleArrowRightOutlined,
	LanguageOutlined,
	ListAltOutlined,
	LocationCityOutlined,
	MovieOutlined,
	PresentToAllOutlined,
	PublicOutlined,
	TransgenderOutlined,
} from '@mui/icons-material';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './AcpLayout.module.css';

export const adminNavItems = [
	{
		title: 'Banner',
		path: 'banners',
		icon: <PresentToAllOutlined />,
		children: [
			{
				title: 'Thêm',
				path: 'create',
			},
		],
	},
	{
		title: 'Giới tính',
		path: 'genders',
		icon: <TransgenderOutlined />,
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
		icon: <AccountCircleOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Tỉnh thành',
		path: 'provinces',
		icon: <LocationCityOutlined />,
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
		icon: <HomeOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Loại ghế',
		path: 'seat-types',
		icon: <ChairOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Thể loại phim',
		path: 'categories',
		icon: <ListAltOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Quốc gia',
		path: 'countries',
		icon: <PublicOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Ngôn ngữ',
		path: 'languages',
		icon: <LanguageOutlined />,
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
		icon: <MovieOutlined />,
		children: [
			{
				path: 'create',
				title: 'Thêm',
			},
		],
	},
	{
		title: 'Lịch chiếu',
		path: 'shows',
		icon: <CalendarMonthOutlined />,
	},
];

const Item = ({ item }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className={styles.item} key={item.path}>
				<Link href={`/acp/${item.path}`} className={styles.left}>
					{item.icon}
					<span className={styles.text}>{item.title}</span>
				</Link>
				{item.children && (
					<span
						onClick={() => setOpen(!open)}
						className={clsx(styles.btn, {
							[styles.open]: open,
						})}
					>
						<ArrowDropDownOutlined />
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
	const currentUser = useSelector((state) => state.user.value);
	const [open, setOpen] = useState(true);

	if (!currentUser) return <LoadingOverlay />;

	if (!currentUser?.admin) return router.push('/');

	return (
		<>
			<Head>
				<title>CGV Fake ACP</title>
			</Head>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.back} onClick={() => router.back()}>
						<ArrowBackIosNewOutlined />
					</div>

					<div
						className={styles.back}
						onClick={() => router.push('/')}
					>
						<HomeOutlined />
					</div>

					<Link href="/acp">
						<h4>CGV Fake ACP</h4>
					</Link>
				</div>
				<div className={styles.main}>
					<div
						className={clsx(styles.sidebar, {
							[styles.open]: open,
						})}
					>
						<div className={styles.items}>
							{adminNavItems.map((e) => (
								<Item key={e.path} item={e} />
							))}
						</div>

						<div
							className={styles.closeBtn}
							onClick={() => setOpen(!open)}
						>
							{open ? (
								<KeyboardDoubleArrowLeftOutlined />
							) : (
								<KeyboardDoubleArrowRightOutlined />
							)}
						</div>
					</div>
					<div className={styles.content}>{children}</div>
				</div>
			</div>
		</>
	);
};

export default AcpLayout;
