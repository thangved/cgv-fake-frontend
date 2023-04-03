/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import LanguageService from '@/services/language.service';
import MovieService from '@/services/movie.service';
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	Select,
} from '@mui/material';
import { DateTimeField } from '@mui/x-date-pickers';
import { addMinutes } from 'date-fns';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const ShowInRoomForm = ({
	initialValues = {
		movieId: 0,
		roomId: 0,
		languageId: 0,
		startAt: '0000-00-00T00:00',
		endAt: '0000-00-00T00:00',
	},
	submitText = 'Gửi',
	onSubmit,
	onCancel,
}) => {
	const { data: movies, isLoading } = useQuery(
		['movies'],
		MovieService.getAll
	);

	const [movieId, setMovieId] = useState(0);

	const { data: movieDetails } = useQuery(['movie', movieId], () =>
		MovieService.getByIdOrSlug(movieId)
	);

	const { data: languages, isLoading: ld3 } = useQuery(
		['languages'],
		LanguageService.getAll
	);

	if (isLoading || ld3) return <LoadingOverlay />;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				movieId: Yup.number()
					.required('Vui lòng chọn phim')
					.notOneOf([0], 'Vui lòng chọn phim'),
				roomId: Yup.number()
					.required('Vui lòng chọn phòng chiếu')
					.notOneOf([0], 'Vui lòng chọn phòng chiếu'),
				startAt: Yup.date().required('Vui lòng chọn giờ chiếu'),
				endAt: Yup.date().required('Vui lòng chọn giờ kết thúc'),
				languageId: Yup.number()
					.required('Vui lòng chọn ngôn ngữ phim')
					.notOneOf([0], 'Vui lòng chọn ngôn ngữ phim'),
			})}
			enableReinitialize
			validateOnMount
			onSubmit={onSubmit}
		>
			{({
				values,
				errors,
				handleChange,
				handleSubmit,
				setFieldValue,
			}) => (
				<form onSubmit={handleSubmit}>
					<FormControl
						fullWidth
						size="small"
						style={{ marginBottom: 20 }}
					>
						<FormHelperText error={!!errors.roomId}>
							{errors.roomId}
						</FormHelperText>
					</FormControl>

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
								setMovieId(event.target.value);
								setFieldValue(
									'endAt',
									addMinutes(
										values.startAt,
										movies.find(
											(e) => e.id === +event.target.value
										).minutes
									)
								);
								handleChange(event);
							}}
						>
							<option disabled value="0">
								Chưa chọn
							</option>

							{movies.map((e) => (
								<option value={e.id} key={e.id}>
									{e.title}
								</option>
							))}
						</Select>
						<FormHelperText error={!!errors.movieId}>
							{errors.movieId}
						</FormHelperText>
					</FormControl>

					<FormControl
						fullWidth
						size="small"
						style={{ marginBottom: 20 }}
						error={!!errors.languageId}
					>
						<InputLabel>Ngôn ngữ phim</InputLabel>
						<Select
							label="Ngôn ngữ phim"
							native
							name="languageId"
							defaultValue={values.languageId}
							onChange={handleChange}
						>
							<option disabled value="0">
								Chưa chọn
							</option>

							{languages.map((e) => (
								<option value={e.id} key={e.id}>
									{e.name}
								</option>
							))}
						</Select>
						<FormHelperText error={!!errors.languageId}>
							{errors.languageId}
						</FormHelperText>
					</FormControl>

					<DateTimeField
						size="small"
						fullWidth
						style={{ marginBottom: 20 }}
						placeholder="Chiếu vào"
						label="Chiếu vào"
						name="startAt"
						value={dayjs(values.startAt)}
						error={!!errors.startAt}
						helperText={errors.startAt}
						format="DD/MM/YYYY HH:mm"
						onChange={(value) => {
							if (movieDetails) {
								setFieldValue(
									'endAt',
									addMinutes(value.$d, movieDetails.minutes)
								);
							}

							setFieldValue('startAt', value.$d, true);
						}}
					/>

					<DateTimeField
						size="small"
						fullWidth
						style={{ marginBottom: 20 }}
						format="DD/MM/YYYY HH:mm"
						placeholder="Kết thúc vào"
						label="Kết thúc vào"
						name="endAt"
						value={dayjs(values.endAt)}
						error={!!errors.endAt}
						helperText={errors.endAt}
						onChange={(value) =>
							setFieldValue('endAt', value.$d, true)
						}
					/>

					<Button type="submit" variant="contained">
						{submitText}
					</Button>

					<Button onClick={onCancel}>Hủy</Button>
				</form>
			)}
		</Formik>
	);
};

export default ShowInRoomForm;
