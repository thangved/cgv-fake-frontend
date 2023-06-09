import LoadingOverlay from '@/components/LoadingOverlay';
import autoAnimate from '@formkit/auto-animate';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
	AccountCircleOutlined,
	ArrowBackIosNewOutlined,
	ArrowDropDownOutlined,
	CalendarMonthOutlined,
	ChairOutlined,
	ConfirmationNumberOutlined,
	HomeOutlined,
	KeyboardDoubleArrowLeftOutlined,
	KeyboardDoubleArrowRightOutlined,
	LanguageOutlined,
	LineAxisOutlined,
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
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './AcpLayout.module.css';

export const adminNavItems = [
	{
		title: 'Thống kê',
		path: 'dashboard',
		icon: <LineAxisOutlined />,
	},
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
	{
		title: 'Hóa đơn',
		path: 'invoices',
		icon: <ConfirmationNumberOutlined />,
	},
];

const Item = ({ item, open }) => {
	const [openChildren, setOpenChildren] = useState(false);
	const [parent1] = useAutoAnimate();
	const [parent2] = useAutoAnimate();

	return (
		<div ref={parent1}>
			<div className={styles.item} key={item.path}>
				<Link
					ref={parent2}
					href={`/acp/${item.path}`}
					className={styles.left}
				>
					{item.icon}
					{open && <span className={styles.text}>{item.title}</span>}
				</Link>
				{item.children && (
					<span
						onClick={() => setOpenChildren(!openChildren)}
						className={clsx(styles.btn, {
							[styles.open]: openChildren,
						})}
					>
						<ArrowDropDownOutlined />
					</span>
				)}
			</div>
			{openChildren && (
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
		</div>
	);
};

const AcpLayout = ({ children }) => {
	const router = useRouter();
	const currentUser = useSelector((state) => state.user.value);
	const [open, setOpen] = useState(true);
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

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
						<div className={styles.items} ref={parent}>
							{adminNavItems.map((e) => (
								<Item key={e.path} item={e} open={open} />
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
