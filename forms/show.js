/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import MovieService from '@/services/movie.service';
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	Select,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const ShowForm = ({
	initialValues = {
		movieId: 0,
		roomId: 0,
		languageId: 0,
		startAt: '0000-00-00',
		endAt: '0000-00-00',
	},
	submitText = 'Gửi',
	onSubmit,
}) => {
	const [movieDetails, setMovieDetails] = useState(null);

	const { data: movies, isLoading: ld1 } = useQuery(
		['movies'],
		MovieService.getAll
	);

	if (ld1) {
		return <LoadingOverlay />;
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				movieId: Yup.number()
					.required('Vui lòng chọn phim')
					.notOneOf([0], 'Vui lòng chọn phim'),
				cinemaId: Yup.number()
					.required('Vui lòng chọn rạp')
					.notOneOf([0], 'Vui lòng chọn rạp'),
				roomId: Yup.number()
					.required('Vui lòng chọn phòng chiếu')
					.notOneOf([0], 'Vui lòng chọn phòng chiếu'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Row style={{ marginTop: 20 }}>
						<Col xs={12} md={6}>
							<FormControl
								fullWidth
								size="small"
								style={{ marginBottom: 20 }}
								error={!!errors.movieId}
							>
								<InputLabel>Phim</InputLabel>
								<Select
									label="Phim"
									native
									name="movieId"
									defaultValue={values.movieId}
									onChange={(event) => {
										setMovieDetails(
											movies.find(
												(e) =>
													e.id ===
													Number(event.target.value)
											)
										);
										handleChange(event);
									}}
								>
									<option disabled value="0">
										Chưa chọn
									</option>

									{movies.map((e) => (
										<option key={e.id} value={e.id}>
											{e.title}
										</option>
									))}
								</Select>
								<FormHelperText error={!!errors.movieId}>
									{errors.movieId}
								</FormHelperText>
							</FormControl>
						</Col>

						<Col xs={12} md={6}>
							{movieDetails && (
								<p>
									<img
										width={300}
										src={movieDetails.verPoster}
										alt={movieDetails.title}
									/>
									<h3>{movieDetails.title}</h3>
									<h4>{movieDetails.brief}</h4>

									<p>
										Thời lượng: {movieDetails.minutes} phút
									</p>
								</p>
							)}
						</Col>
					</Row>

					<Button
						type="submit"
						variant="contained"
						style={{ marginTop: 10 }}
					>
						{submitText}
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default ShowForm;
