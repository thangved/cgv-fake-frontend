/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import ShowService from '@/services/show.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import styles from './CreateShow.module.css';

const CreateShow = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const {
		data: movieDetails,
		isLoading,
		isError,
	} = useQuery(['movie', router.query.movieId], () =>
		MovieService.getByIdOrSlug(router.query.movieId)
	);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await ShowService.create(values);
			router.back();
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading || isError) return <LoadingOverlay />;

	return (
		<>
			<Container className={styles.wrapper}>
				<h2 style={{ margin: '20px 0' }}>Suất chiếu</h2>

				<h3 style={{ margin: '10px 0' }}>Phim: {movieDetails.title}</h3>
				<h4 style={{ margin: '10px 0' }}>{movieDetails.brief}</h4>

				<Row>
					<Col
						xs={12}
						md={6}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img
							src={movieDetails.verPoster}
							width={300}
							alt={movieDetails.title}
						/>
					</Col>

					<Col xs={12} md={6}>
						<h4 style={{ marginBottom: 20 }}>Thông tin bộ phim</h4>
						<p>
							<FontAwesomeIcon icon={faClock} /> Thời lượng:{' '}
							{movieDetails.minutes} phút
						</p>

						<p>Đạo diễn: {movieDetails.director}</p>
						<p>Nhà sản xuất: {movieDetails.studio}</p>

						<p>
							Thể loại:{' '}
							{movieDetails.categories
								.map((e) => e.name)
								.join(', ')}
						</p>

						<p>
							Quốc gia sản suất:{' '}
							{movieDetails.countries
								.map((e) => e.name)
								.join(', ')}
						</p>

						<p>
							Khởi chiếu:{' '}
							{dayjs(movieDetails.showAt).format('DD/MM/YYYY')}
						</p>

						<h4 style={{ marginBottom: 20 }}>Nội dung</h4>

						<div
							dangerouslySetInnerHTML={{
								__html: movieDetails.content,
							}}
						></div>
					</Col>
				</Row>

				{/* <ShowForm submitText="Thêm" onSubmit={handleCreate} /> */}
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateShow.layout = AcpLayout;

export default CreateShow;
