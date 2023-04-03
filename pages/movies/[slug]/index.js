import Button from '@/components/Button';
import CinemaByMovie from '@/components/CinemaByMovie';
import Input from '@/components/Input';
import LoadingOverlay from '@/components/LoadingOverlay';
import Modal from '@/components/Modal';
import MovieCard from '@/components/MovieCard';
import Select from '@/components/Select';
import MovieForm from '@/forms/movie';
import CinemaService from '@/services/cinema.service';
import MovieService from '@/services/movie.service';
import ProvinceService from '@/services/province.service';
import ShowService from '@/services/show.service';
import { faCirclePlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Col, Container, Row } from 'react-grid-system';
import ReactPlayer from 'react-player';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styles from './Movie.module.css';

export async function getServerSideProps(context) {
	const movieDetails = await MovieService.getByIdOrSlug(context.query.slug);
	const showNows = await MovieService.getAll({ show: 'now' });
	const provinces = await ProvinceService.getAll();

	return {
		props: {
			movieDetails,
			showNows,
			provinces,
		},
	};
}

const Movie = ({ movieDetails, showNows, provinces }) => {
	const [showTrailer, setShowTrailer] = useState(false);
	const [editing, setEditing] = useState(false);
	const [filter, setFilter] = useState({
		provinceId: 0,
		date: dayjs(new Date()).format('YYYY-MM-DD'),
		cinemaId: 0,
	});

	const { data: cinemas } = useQuery(
		['cinemas', 'provinceId', filter.provinceId],
		() => CinemaService.getAll({ provinceId: filter.provinceId }),
		{ initialData: [] }
	);

	const { data: shows } = useQuery(
		['shows', 'movieId', movieDetails.id, 'filter', filter],
		() =>
			ShowService.getAll({
				movieId: movieDetails.id,
				group: true,
				...filter,
			}),
		{ initialData: [] }
	);

	const currentUser = useSelector((state) => state.user.value);

	const handleUpdate = async (values) => {
		try {
			await MovieService.update(values.id, values);
		} catch (error) {
		} finally {
			setEditing(false);
		}
	};

	useEffect(() => {
		setFilter((prev) => ({ ...prev, cinemaId: 0 }));
	}, [filter.provinceId]);

	if (!currentUser) return <LoadingOverlay />;

	return (
		<Container className={styles.wrapper}>
			<Head>
				<title>Đặt vé {movieDetails.title}</title>
			</Head>
			<Row>
				<Col xs={12} md={9}>
					{editing ? (
						<MovieForm
							initialValues={{
								...movieDetails,
								countries: movieDetails.countries.map(
									(e) => e.id
								),
								categories: movieDetails.categories.map(
									(e) => e.id
								),
							}}
							submitText="Lưu"
							onSubmit={handleUpdate}
						/>
					) : (
						<>
							<Row style={{ position: 'relative' }}>
								{currentUser.admin && (
									<Button
										outlined
										style={{
											position: 'absolute',
											right: 0,
											top: 0,
											zIndex: 10,
										}}
										onClick={() => setEditing(!editing)}
									>
										Chỉnh sửa
									</Button>
								)}

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
												onClick={() =>
													setShowTrailer(true)
												}
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
											<span>
												{' '}
												{movieDetails.director}
											</span>
										</div>

										<div>
											<span className={styles.label}>
												Quốc gia:
											</span>
											<span>
												{' '}
												{movieDetails.countries
													.map((e) => e.name)
													.join(', ')}
											</span>
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
												{' '}
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
												{dayjs(
													movieDetails.showAt
												).format(' DD/MM/YYYY')}
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
						</>
					)}

					<h3>LỊCH CHIẾU</h3>

					<Row>
						<Col xs={12} md={4}>
							<Select
								value={filter.provinceId}
								onChange={(event) =>
									setFilter((prev) => ({
										...prev,
										provinceId: event.target.value,
									}))
								}
							>
								<option value="0">Cả nước</option>
								{provinces.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</Select>
						</Col>

						<Col xs={12} md={4}>
							<label htmlFor="filter-date">
								<Input
									value={filter.date}
									type="date"
									onChange={(event) =>
										setFilter((prev) => ({
											...prev,
											date: event.target.value,
										}))
									}
								/>
							</label>
						</Col>

						<Col xs={12} md={4}>
							<Select
								value={filter.cinemaId}
								onChange={(event) =>
									setFilter((prev) => ({
										...prev,
										cinemaId: event.target.value,
									}))
								}
							>
								<option value="0">Tất cả rạp</option>
								{cinemas.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</Select>
						</Col>
					</Row>

					{shows.length ? (
						shows.map((e) => (
							<CinemaByMovie key={e.shows[0].id} details={e} />
						))
					) : (
						<p style={{ padding: 20, textAlign: 'center' }}>
							Không có lịch chiếu hôm nay
						</p>
					)}
				</Col>
				<Col xs={12} md={3}>
					<h3>PHIM ĐANG CHIẾU</h3>

					<Row>
						{showNows.map((e) => (
							<Col xs={12} key={e.id}>
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
