import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const GenderForm = ({
	initialValue = { name: '' },
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValue}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Vui lòng nhập giới tính'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						autoFocus
						placeholder="Giới tính"
						label="Giới tính"
						value={values.name}
						name="name"
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						fullWidth
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

export default GenderForm;
