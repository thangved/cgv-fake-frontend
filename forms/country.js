import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CountryForm = ({
	initialValues = { name: '', id: null },
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Vui lòng nhập tên quốc gia'),
				id: Yup.number().nullable(),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Mã quốc gia (bỏ trống để tạo tự động)"
						label="Mã quốc gia (bỏ trống để tạo tự động)"
						value={values.id}
						name="id"
						onChange={handleChange}
						error={!!errors.id}
						helperText={errors.id}
						fullWidth
						size="small"
						autoFocus
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Tên quốc gia"
						label="Tên quốc gia"
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

export default CountryForm;
