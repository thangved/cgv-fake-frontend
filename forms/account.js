import LoadingOverlay from '@/components/LoadingOverlay';
import { uploadFile } from '@/firebase';
import GenderService from '@/services/gender.service';
import { FileUploadOutlined } from '@mui/icons-material';
import {
	Avatar,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	Select,
	TextField,
} from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { Col, Row } from 'react-grid-system';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const AccountForm = ({
	initialValues = {
		fullName: '',
		email: '',
		avatar: 'http://www.gravatar.com/avatar/?d=identicon',
		genderId: 0,
		dateOfBirth: new Date(),
		password: null,
		admin: false,
	},
	submitText = 'Gửi',
	hidePassword = false,
	onSubmit = () => {},
}) => {
	const { data: genders, isLoading } = useQuery(
		['genders'],
		GenderService.getAll
	);

	if (isLoading) return <LoadingOverlay />;

	const validationSchema = {
		fullName: Yup.string().required('Vui lòng nhập họ tên'),
		email: Yup.string()
			.email('Địa chỉ email không hợp lệ')
			.required('Vui lòng nhập email'),
		avatar: Yup.string()
			.required('Vui lòng nhập link ảnh')
			.url('Link ảnh không hợp lệ'),
		genderId: Yup.number().required('Vui lòng chọn giới tính'),
		dateOfBirth: Yup.date().required('Vui lòng nhập ngày sinh'),
		admin: Yup.boolean().required(),
	};

	if (!hidePassword) {
		validationSchema.password = Yup.string().required(
			'Vui lòng nhập mật khẩu'
		);
	}

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={Yup.object().shape(validationSchema)}
			onSubmit={onSubmit}
		>
			{({
				values,
				errors,
				handleChange,
				setFieldValue,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						size="small"
						fullWidth
						placeholder="Họ tên"
						label="Họ tên"
						name="fullName"
						onChange={handleChange}
						error={!!errors.fullName}
						helperText={errors.fullName}
						value={values.fullName}
					/>

					<TextField
						style={{ marginBottom: 20 }}
						size="small"
						fullWidth
						placeholder="Email"
						label="Email"
						name="email"
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
						value={values.email}
					/>

					<Row style={{ marginBottom: 20 }}>
						<Col xs={12} md={6}>
							<Button
								startIcon={<FileUploadOutlined />}
								fullWidth
								variant="outlined"
								component="label"
							>
								Tải ảnh lên
								<input
									hidden
									type="file"
									accept="image/*"
									onChange={async ({ target: { files } }) => {
										const file = files[0];

										if (!file) return;

										const res = await uploadFile(file);

										setFieldValue('avatar', res);
									}}
								/>
							</Button>
						</Col>

						<Col xs={12} md={6}>
							<Avatar
								src={values.avatar}
								sx={{ width: 100, height: 100 }}
							/>
						</Col>
					</Row>

					<FormControl fullWidth>
						<InputLabel>Giới tính</InputLabel>
						<Select
							label="Giới tính"
							style={{ marginBottom: 20 }}
							value={values.genderId}
							name="genderId"
							size="small"
							onChange={handleChange}
							native
						>
							<option value="0">Chưa chọn</option>
							{genders.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</Select>
					</FormControl>

					<DateField
						style={{ marginBottom: 20 }}
						size="small"
						fullWidth
						format="DD/MM/YYYY"
						label="Ngày sinh"
						name="dateOfBirth"
						onChange={(value) => {
							setFieldValue('dateOfBirth', value.$d);
						}}
						error={!!errors.dateOfBirth}
						helperText={errors.dateOfBirth}
						value={dayjs(values.dateOfBirth)}
					/>

					<FormControlLabel
						style={{ width: '100%', marginBottom: 20 }}
						label="Quản trị viên"
						control={<Checkbox />}
						checked={values.admin}
						onChange={(_, checked) =>
							handleChange({
								target: { name: 'admin', value: checked },
							})
						}
					/>

					{!hidePassword && (
						<TextField
							style={{ marginBottom: 20 }}
							size="small"
							fullWidth
							type="password"
							label="Mật khẩu"
							placeholder="Mật khẩu"
							name="password"
							onChange={handleChange}
							error={!!errors.password}
							helperText={errors.password}
							value={values.password}
						/>
					)}

					<Button type="submit" variant="contained">
						{submitText}
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default AccountForm;
