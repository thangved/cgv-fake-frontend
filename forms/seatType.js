import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SeatTypeForm = ({
	initialValues = {
		name: '',
		color: '#000',
		price1: 0,
		price2: 0,
		price3: 0,
		price4: 0,
		price5: 0,
		price6: 0,
		price7: 0,
	},
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				name: Yup.string().required('Vui lòng nhập tên loại ghế'),
				color: Yup.string().required('Vui lòng chọn màu ghế'),
				price1: Yup.number().required('Vui lòng nhập giá vé'),
				price2: Yup.number().required('Vui lòng nhập giá vé'),
				price3: Yup.number().required('Vui lòng nhập giá vé'),
				price4: Yup.number().required('Vui lòng nhập giá vé'),
				price5: Yup.number().required('Vui lòng nhập giá vé'),
				price6: Yup.number().required('Vui lòng nhập giá vé'),
				price7: Yup.number().required('Vui lòng nhập giá vé'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Tên loại ghế"
						label="Tên loại ghế"
						value={values.name}
						name="name"
						onChange={handleChange}
						error={!!errors.name}
						helperText={errors.name}
						fullWidth
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Màu ghế"
						label="Màu ghế"
						value={values.color}
						name="color"
						onChange={handleChange}
						error={!!errors.color}
						helperText={errors.color}
						type="color"
						fullWidth
						size="small"
					/>

					<h3 style={{ marginBottom: 20 }}>Giá vé</h3>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 2"
						label="Thứ 2"
						value={values.price1}
						name="price1"
						onChange={handleChange}
						error={!!errors.price1}
						helperText={errors.price1}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 3"
						label="Thứ 3"
						value={values.price2}
						name="price2"
						onChange={handleChange}
						error={!!errors.price2}
						helperText={errors.price2}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 4"
						label="Thứ 4"
						value={values.price3}
						name="price3"
						onChange={handleChange}
						error={!!errors.price3}
						helperText={errors.price3}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 5"
						label="Thứ 5"
						value={values.price4}
						name="price4"
						onChange={handleChange}
						error={!!errors.price4}
						helperText={errors.price4}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 6"
						label="Thứ 6"
						value={values.price5}
						name="price5"
						onChange={handleChange}
						error={!!errors.price5}
						helperText={errors.price5}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Thứ 7"
						label="Thứ 7"
						value={values.price6}
						name="price6"
						onChange={handleChange}
						error={!!errors.price6}
						helperText={errors.price6}
						fullWidth
						type="number"
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						placeholder="Chủ nhật"
						label="Chủ nhật"
						value={values.price7}
						name="price7"
						onChange={handleChange}
						error={!!errors.price7}
						helperText={errors.price7}
						fullWidth
						type="number"
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

export default SeatTypeForm;
