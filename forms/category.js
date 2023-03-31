import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const CategoryForm = ({
	initialValues = { name: '' },
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Vui lòng nhập tên thể loại'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						autoFocus
						placeholder="Thể loại"
						label="Thể loại"
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

export default CategoryForm;
