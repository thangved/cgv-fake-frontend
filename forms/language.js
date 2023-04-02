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

const LanguageForm = ({
	initialValues = { name: '' },
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
				name: Yup.string().required('Vui lòng nhập tên ngôn ngữ'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 20 }}
						autoFocus
						placeholder="Tên ngôn ngữ"
						label="Tên ngôn ngữ"
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

export default LanguageForm;
