import Head from 'next/head';
import Link from 'next/link';
import { Col, Container, Row } from 'react-grid-system';

import Button from '@/components/Button';
import MovieCard from '@/components/MovieCard';
import Slider from '@/components/Slider';
import Tabs from '@/components/Tabs';
import banners from '@/mock/banners';
import movies from '@/mock/movies';

export async function getStaticProps() {
	return {
		props: { movies },
	};
}

export default function Home({ movies }) {
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
										{movies.map((e, index) => (
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
										{movies.reverse().map((e, index) => (
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
