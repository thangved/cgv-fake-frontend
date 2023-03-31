import MovieCard from '@/components/MovieCard';
import Tabs from '@/components/Tabs';
import movies from '@/mock/movies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-grid-system';

export async function getServerSideProps() {
	return {
		props: { showNows: movies, showComings: [...movies].reverse() },
	};
}

const showTypes = ['now', 'coming'];
const titles = ['Phim đang chiếu', 'Phim sắp chiếu'];

const Movies = ({ showNows, showComings }) => {
	const router = useRouter();

	const currentIndex = showTypes.indexOf(router.query.show || 'now') || 0;

	const title = titles[currentIndex];

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Container>
				<Tabs
					key={currentIndex}
					initialIndex={currentIndex}
					items={[
						{
							label: 'Phim đang chiếu',
							component: (
								<div style={{ paddingTop: 10 }}>
									<Row gutterWidth={10}>
										{showNows.map((e, index) => (
											<Col
												xs={12}
												sm={6}
												md={4}
												lg={3}
												key={index}
											>
												<MovieCard
													ratio={0.8}
													details={{
														...e,
														image: e.verPoster,
													}}
												/>
											</Col>
										))}
									</Row>
								</div>
							),
							onClick() {
								router.push({
									query: {
										show: 'now',
									},
								});
							},
						},
						{
							label: 'Phim sắp chiếu',
							component: (
								<div style={{ paddingTop: 10 }}>
									<Row gutterWidth={10}>
										{showComings.map((e, index) => (
											<Col
												xs={12}
												sm={6}
												md={4}
												lg={3}
												key={index}
											>
												<MovieCard
													ratio={0.8}
													details={{
														...e,
														image: e.verPoster,
													}}
												/>
											</Col>
										))}
									</Row>
								</div>
							),
							onClick() {
								router.push({
									query: {
										show: 'coming',
									},
								});
							},
						},
					]}
				/>
			</Container>
		</>
	);
};

export default Movies;
