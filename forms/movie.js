/* eslint-disable @next/next/no-img-element */
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import dynamic from 'next/dynamic';
import { AspectRatio } from 'react-aspect-ratio';
import { Col, Row } from 'react-grid-system';
import ReactPlayer from 'react-player';
import * as Yup from 'yup';

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

const MovieForm = ({
	initialValues = {
		title: '',
		brief: '',
		studio: '',
		director: '',
		verPoster: '',
		horPoster: '',
		trailer: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		minutes: 90,
		content: '',
		showAt: null,
		countryId: null,
		categories: [],
	},
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				title: Yup.string().required('Vui lòng nhập tiêu đề phim'),
				brief: Yup.string().required('Vui lòng nhập mô tả ngắn'),
				studio: Yup.string().required('Vui lòng nhập tên nhà sản xuất'),
				director: Yup.string().required('Vui lòng nhập tên đạo diễn'),
				countryId: Yup.string().required('Vui lòng chọn quốc gia'),
				categories: Yup.array().of(Yup.number()),
				verPoster: Yup.string()
					.required('Vui lòng tải poster lên')
					.url('Ảnh không hợp lệ'),
				horPoster: Yup.string()
					.required('Vui lòng tải poster lên')
					.url('Ảnh không hợp lệ'),
				trailer: Yup.string()
					.required('Vui lòng nhập link trailer')
					.url('Link trailer không hợp lệ'),
				minutes: Yup.number().required('Vui lòng nhập thời lượng phim'),
				content: Yup.string().required('Vui lòng nhập nội dung phim'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<h3 style={{ margin: '10px 0' }}>Thông tin cơ bản</h3>
					<Row>
						<Col sm={12} md={6}>
							<TextField
								autoFocus
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
								value={values.title}
								placeholder="Tiêu đề"
								label="Tiêu đề"
								name="title"
								onChange={handleChange}
								error={!!errors.title}
								helperText={errors.title}
							/>

							<TextField
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
								value={values.brief}
								placeholder="Mô tả ngắn"
								label="Mô tả ngắn"
								name="brief"
								onChange={handleChange}
								error={!!errors.brief}
								helperText={errors.brief}
							/>

							<TextField
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
								value={values.studio}
								placeholder="Nhà sản xuất"
								label="Nhà sản xuất"
								name="studio"
								onChange={handleChange}
								error={!!errors.studio}
								helperText={errors.studio}
							/>

							<TextField
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
								value={values.director}
								placeholder="Đạo diễn"
								label="Đạo diễn"
								name="director"
								onChange={handleChange}
								error={!!errors.director}
								helperText={errors.director}
							/>

							<FormControl
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
							>
								<InputLabel>Quốc gia sản xuất</InputLabel>

								<Select
									error={!!errors.countryId}
									label="Quốc gia sản xuất"
									name="countryId"
									native
									defaultValue="0"
									onChange={handleChange}
								>
									<option value="0" disabled>
										Chưa chọn
									</option>
									<option value="1">Vietnam</option>
									<option value="2">Japan</option>
								</Select>

								<FormHelperText error={!!errors.countryId}>
									{errors.countryId}
								</FormHelperText>
							</FormControl>

							<FormControl
								size="small"
								fullWidth
								style={{ marginBottom: 20 }}
							>
								<InputLabel>Thể loại</InputLabel>

								<Select
									error={!!errors.categories}
									label="Thể loại"
									name="categories"
									defaultValue={values.categories}
									multiple
									onChange={handleChange}
								>
									<MenuItem value="1">Vietnam</MenuItem>
									<MenuItem value="2">Japan</MenuItem>
								</Select>

								<FormHelperText error={!!errors.categories}>
									{errors.categories}
								</FormHelperText>
							</FormControl>

							<TextField
								size="small"
								fullWidth
								type="number"
								style={{ marginBottom: 20 }}
								value={values.minutes}
								placeholder="Thời lượng phim (phút)"
								label="Thời lượng phim (phút)"
								name="minutes"
								onChange={handleChange}
								error={!!errors.minutes}
								helperText={errors.minutes}
							/>
						</Col>

						<Col sm={12} md={6}>
							<Button
								color={errors.verPoster ? 'error' : 'primary'}
								fullWidth
								variant="outlined"
								startIcon={
									<FontAwesomeIcon icon={faFileUpload} />
								}
								component="label"
							>
								Poster dọc
								<input hidden type="file" accept="image/*" />
							</Button>

							<FormHelperText
								style={{ marginBottom: 20 }}
								error={!!errors.verPoster}
							>
								{errors.verPoster}
							</FormHelperText>

							<Button
								fullWidth
								color={errors.verPoster ? 'error' : 'primary'}
								variant="outlined"
								startIcon={
									<FontAwesomeIcon icon={faFileUpload} />
								}
								component="label"
							>
								Poster ngang
								<input hidden type="file" accept="image/*" />
							</Button>
							<FormHelperText
								style={{ marginBottom: 20 }}
								error={!!errors.horPoster}
							>
								{errors.horPoster}
							</FormHelperText>

							<TextField
								size="small"
								fullWidth
								value={values.trailer}
								placeholder="Trailer"
								label="Trailer"
								name="trailer"
								onChange={handleChange}
								error={!!errors.trailer}
								helperText={errors.trailer}
								style={{ marginBottom: 20 }}
							/>
							<AspectRatio
								ratio={16 / 9}
								style={{ marginBottom: 20 }}
							>
								<ReactPlayer
									width="100%"
									height="100%"
									url={values.trailer}
								/>
							</AspectRatio>

							<TextField
								style={{ marginBottom: 20 }}
								size="small"
								fullWidth
								value={values.showAt}
								placeholder="Khởi chiếu vào"
								label="Khởi chiếu vào"
								name="showAt"
								type="date"
								onChange={handleChange}
								error={!!errors.showAt}
								helperText={errors.showAt}
							/>
						</Col>
					</Row>

					<h4 style={{ marginBottom: 10 }}>Nội dung phim</h4>

					<Editor
						value={values.content}
						onChange={(value) =>
							handleChange({
								target: {
									name: 'content',
									value,
								},
							})
						}
					/>

					<FormHelperText error={!!errors.content}>
						{errors.content}
					</FormHelperText>

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

export default MovieForm;