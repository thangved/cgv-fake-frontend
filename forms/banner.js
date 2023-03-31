/* eslint-disable @next/next/no-img-element */
import { uploadFile } from '@/firebase';
import {
	Button,
	Checkbox,
	FormControlLabel,
	Switch,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

const BannerForm = ({
	initialValues = { image: '', url: '', visible: false },
	submitText = 'Gửi',
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				image: Yup.string().required('Vui lòng chọn ảnh'),
				url: Yup.string().required('Vui lòng nhập đường dẫn'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						type="file"
						onChange={async (event) => {
							try {
								const file = event.target.files[0];

								if (!file) {
									return;
								}

								const imageURL = await uploadFile(file);

								handleChange({
									target: {
										name: 'image',
										value: imageURL,
									},
								});
							} catch (error) {
								toast.error(error.toString());
							}
						}}
						inputProps={{ accept: 'image/*' }}
						error={!!errors.name}
						helperText={errors.name}
						fullWidth
						size="small"
					/>

					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						disabled
						placeholder="Ảnh"
						value={values.image}
						name="image"
						onChange={handleChange}
						error={!!errors.image}
						helperText={errors.image}
						fullWidth
						size="small"
					/>

					{values.image && (
						<img
							src={values.image}
							style={{
								maxHeight: 300,
								maxWidth: '100%',
								marginBottom: 20,
							}}
							alt="Banner"
						/>
					)}

					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Đường dẫn"
						label="Đường dẫn"
						value={values.url}
						name="url"
						onChange={handleChange}
						error={!!errors.url}
						helperText={errors.url}
						fullWidth
						size="small"
					/>

					<FormControlLabel
						label="Hiển thị"
						style={{ width: '100%', marginBottom: 20 }}
						control={<Checkbox />}
						name="visible"
						checked={values.visible}
						onChange={(_, value) =>
							handleChange({
								target: { name: 'visible', value },
							})
						}
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

export default BannerForm;
