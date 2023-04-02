/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import ProvinceService from '@/services/province.service';
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	Select,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const CinemaForm = ({
	initialValues = { name: '', address: '', provinceId: 0 },
	submitText = 'Gửi',
	onSubmit,
}) => {
	const { data: provinces, isLoading } = useQuery(
		['provinces'],
		ProvinceService.getAll
	);

	if (isLoading) return <LoadingOverlay />;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Vui lòng nhập tên rạp'),
				address: Yup.string().required('Vui lòng nhập địa chỉ'),
				provinceId: Yup.number()
					.required('Vui lòng chọn tỉnh thành')
					.notOneOf([0], 'Vui lòng chọn tỉnh thành'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Tên rạp"
						label="Tên rạp"
						value={values.name}
						name="name"
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						fullWidth
						size="small"
					/>

					<FormControl
						fullWidth
						size="small"
						style={{ marginBottom: 20 }}
						error={!!errors.provinceId}
					>
						<InputLabel>Tỉnh thành</InputLabel>
						<Select
							label="Tỉnh thành"
							native
							name="provinceId"
							defaultValue={values.provinceId}
							onChange={handleChange}
						>
							<option value="0">Chưa chọn</option>
							{provinces.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</Select>

						<FormHelperText error={!!errors.provinceId}>
							{errors.provinceId}
						</FormHelperText>
					</FormControl>

					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Địa chỉ"
						label="Địa chỉ"
						value={values.address}
						name="address"
						onChange={handleChange}
						error={!!errors.address}
						helperText={errors.address}
						fullWidth
						size="small"
					/>

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

export default CinemaForm;
