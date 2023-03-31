import Button from '@/components/Button';
import MovieCard from '@/components/MovieCard';
import Slider from '@/components/Slider';
import Tabs from '@/components/Tabs';
import BannerService from '@/services/banner.service';
import MovieService from '@/services/movie.service';
import Head from 'next/head';
import Link from 'next/link';
import { Col, Container, Row } from 'react-grid-system';

export async function getServerSideProps() {
	const banners = await BannerService.getAllPublic();
	const moviesShowNow = await MovieService.getAll({ show: 'now' });
	const moviesShowComing = await MovieService.getAll({ show: 'coming' });

	return {
		props: { moviesShowNow, moviesShowComing, banners },
	};
}

export default function Home({ moviesShowNow, moviesShowComing, banners }) {
	return (
		<>
			<Head>
				<title>CGV Fake</title>
				<meta
					name="description"
					content="Xem phim theo cách của bmạn"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Slider items={banners} />

			<Container>
				<Tabs
					items={[
						{
							label: 'Phim đang chiếu',
							component: (
								<div style={{ paddingTop: 10 }}>
									<Row gutterWidth={10}>
										{moviesShowNow.map((e, index) => (
											<Col
												xs={12}
												md={6}
												lg={4}
												key={index}
											>
												<MovieCard details={e} />
											</Col>
										))}
									</Row>

									<Row justify="end">
										<Link href="/movies?show=now">
											<Button outlined>XEM THÊM</Button>
										</Link>
									</Row>
								</div>
							),
						},
						{
							label: 'Phim sắp chiếu',
							component: (
								<div style={{ paddingTop: 10 }}>
									<Row gutterWidth={10}>
										{moviesShowComing.map((e, index) => (
											<Col
												xs={12}
												md={6}
												lg={4}
												key={index}
											>
												<MovieCard details={e} />
											</Col>
										))}
									</Row>

									<Row justify="end">
										<Link href="/movies?show=coming">
											<Button outlined>XEM THÊM</Button>
										</Link>
									</Row>
								</div>
							),
						},
					]}
				/>
			</Container>
		</>
	);
}
