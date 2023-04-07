/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import CinemaService from '@/services/cinema.service';
import MovieService from '@/services/movie.service';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-grid-system';
import { useQuery } from 'react-query';
import CreateInCinema from '../../../../components/CreateInCinema';
import styles from './CreateShow.module.css';
import { useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

const CreateShow = () => {
	const router = useRouter();
	const parent = useRef(null);

	const { data: movieDetails, isLoading } = useQuery(
		['movie', router.query.movieId],
		() => MovieService.getByIdOrSlug(router.query.movieId)
	);

	const { data: cinemas, isLoading: ld2 } = useQuery(
		['cinemas'],
		CinemaService.getAll
	);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	if (isLoading || !movieDetails || ld2) return <LoadingOverlay />;

	return (
		<>
			<Container className={styles.wrapper}>
				<h2 style={{ margin: '20px 0' }}>Suất chiếu</h2>

				<Row>
					<Col
						xs={12}
						md={6}
						style={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<div style={{ width: '100%' }}>
							<h3 style={{ margin: '10px 0' }}>
								Phim: {movieDetails.title}
							</h3>
							<h4 style={{ margin: '10px 0' }}>
								{movieDetails.brief}
							</h4>
							<h5 style={{ margin: '10px 0' }}>
								Thời lượng: {movieDetails.minutes} Phút
							</h5>
							<h5 style={{ margin: '10px 0' }}>
								Khởi chiếu:{' '}
								{dayjs(movieDetails.showAt).format(
									'DD/MM/YYYY'
								)}
							</h5>
						</div>

						<img
							src={movieDetails.verPoster}
							width={300}
							alt={movieDetails.title}
						/>
					</Col>

					<Col xs={12} md={6} ref={parent}>
						{cinemas.map((e) => (
							<CreateInCinema
								key={e.id}
								cinemaDetails={e}
								movieDetails={movieDetails}
							/>
						))}
					</Col>
				</Row>
			</Container>
		</>
	);
};

CreateShow.layout = AcpLayout;

export default CreateShow;
