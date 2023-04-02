/* eslint-disable @next/next/no-img-element */
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProvinceForm = ({
	initialValues = { id: null, name: '' },
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				id: Yup.number().nullable(),
				name: Yup.string().required('Vui lòng nhập tên tỉnh'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Mã tỉnh (bỏ trống để tạo tự động)"
						label="Mã tỉnh"
						value={values.id}
						name="id"
						onChange={handleChange}
						error={!!errors.id}
						helperText={errors.id}
						fullWidth
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Tên tỉnh"
						label="Tên tỉnh"
						value={values.name}
						name="name"
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
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

export default ProvinceForm;
