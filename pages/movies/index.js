import MovieCard from '@/components/MovieCard';
import Tabs from '@/components/Tabs';
import movies from '@/mock/movies';
import { Col, Container, Row } from 'react-grid-system';

const Movies = () => {
	return (
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
											sm={6}
											md={4}
											lg={3}
											key={index}
										>
											<MovieCard
												ratio={0.8}
												details={e}
											/>
										</Col>
									))}
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
											sm={6}
											md={4}
											lg={3}
											key={index}
										>
											<MovieCard
												ratio={0.8}
												details={e}
											/>
										</Col>
									))}
								</Row>
							</div>
						),
					},
				]}
			/>
		</Container>
	);
};

export default Movies;
