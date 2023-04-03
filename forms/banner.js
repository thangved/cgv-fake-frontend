/* eslint-disable @next/next/no-img-element */
import { uploadFile } from '@/firebase';
import { FileUploadOutlined } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Formik } from 'formik';
import Link from 'next/link';
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
					<Button
						component="label"
						fullWidth
						variant="outlined"
						style={{ marginBottom: 20 }}
						startIcon={<FileUploadOutlined />}
					>
						Tải ảnh lên
						<input
							hidden
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
							accept="image/*"
						/>
					</Button>

					<Link
						href={values.url}
						style={{
							width: '100%',
							height: 400,
							backgroundImage: `url(${values.image})`,
							display: 'block',
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							marginBottom: 20,
						}}
						target="_blank"
					></Link>

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
