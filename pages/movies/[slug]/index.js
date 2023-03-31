import Button from '@/components/Button';
import CinemaByMovie from '@/components/CinemaByMovie';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import MovieCard from '@/components/MovieCard';
import Select from '@/components/Select';
import cinemaShows from '@/mock/cinemaShows';
import MovieService from '@/services/movie.service';
import { faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Col, Container, Row } from 'react-grid-system';
import ReactPlayer from 'react-player';
import styles from './Movie.module.css';

export async function getServerSideProps(context) {
	const movieDetails = await MovieService.getByIdOrSlug(context.query.slug);
	const showNows = await MovieService.getAll({ show: 'now' });

	return {
		props: {
			movieDetails,
			cinemaShows,
			showNows,
		},
	};
}

const Movie = ({ movieDetails, cinemaShows, showNows }) => {
	const [showTrailer, setShowTrailer] = useState(false);

	return (
		<Container className={styles.wrapper}>
			<Head>
				<title>Đặt vé {movieDetails.title}</title>
			</Head>
			<Row>
				<Col xs={12} md={9}>
					<Row>
						<Col xs={12} md={3}>
							<AspectRatio
								className={styles.Poster}
								ratio={0.7}
								style={{
									backgroundImage: `url(${movieDetails.verPoster})`,
								}}
							>
								<div>
									<FontAwesomeIcon
										icon={faCirclePlay}
										className={styles.playButton}
										size="4x"
										onClick={() => setShowTrailer(true)}
									/>
								</div>
							</AspectRatio>
						</Col>

						<Modal
							open={showTrailer}
							title={movieDetails.title}
							onClose={() => setShowTrailer(false)}
						>
							<AspectRatio ratio={16 / 9}>
								<ReactPlayer
									controls
									width="100%"
									height="100%"
									playing
									url={movieDetails.trailer}
								/>
							</AspectRatio>
						</Modal>

						<Col xs={12} md={9}>
							<h2 className={styles.title}>
								{movieDetails.title}
							</h2>

							<h2 className={styles.brief}>
								{movieDetails.brief}
							</h2>

							<div className={styles.details}>
								<span>
									<FontAwesomeIcon icon={faClock} />{' '}
									{movieDetails.minutes} phút
								</span>

								<div>
									<span className={styles.label}>
										Đạo diễn:
									</span>
									<span> {movieDetails.director}</span>
								</div>

								<div>
									<span className={styles.label}>
										Quốc gia:
									</span>
									<span> {movieDetails.country.name}</span>
								</div>

								<div>
									<span className={styles.label}>
										Nhà sản xuất:
									</span>
									<span> {movieDetails.studio}</span>
								</div>

								<div>
									<span className={styles.label}>
										Thể loại:
									</span>
									<span>
										{movieDetails.categories
											.map((e) => e.name)
											.join(', ')}
									</span>
								</div>

								<div>
									<span className={styles.label}>
										Ngày khởi chiếu:
									</span>
									<span>
										{dayjs(movieDetails.showAt).format(
											' DD/MM/YYYY'
										)}
									</span>
								</div>
							</div>
						</Col>
					</Row>
					<h3>NỘI DUNG PHIM</h3>

					<div
						className={styles.content}
						dangerouslySetInnerHTML={{
							__html: movieDetails.content,
						}}
					></div>

					<h3>LỊCH CHIẾU</h3>

					<Row>
						<Col xs={12} md={4}>
							<Select>
								<option value="all">Cả nước</option>
								<option value="hcm">
									Thành phố Hồ Chí Minh
								</option>
								<option value="ct">Thành phố Cần Thơ</option>
							</Select>
						</Col>

						<Col xs={12} md={4}>
							<Input type="date" />
						</Col>

						<Col xs={12} md={4}>
							<Select>
								<option value="all">Tất cả rạp</option>
								<option value="hchv">Vimcom Hùng Vương</option>
							</Select>
						</Col>
					</Row>

					{cinemaShows.map((e) => (
						<CinemaByMovie key={e.id} details={e} />
					))}
				</Col>
				<Col xs={12} md={3}>
					<h3>PHIM ĐANG CHIẾU</h3>

					<Row>
						{showNows.map((e, index) => (
							<Col xs={12} key={index}>
								<MovieCard details={e} />
							</Col>
						))}
					</Row>

					<Row justify="end" style={{ margin: '20px 0' }}>
						<Link href="/movies?show=now">
							<Button outlined>XEM THÊM</Button>
						</Link>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Movie;
