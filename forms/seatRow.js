import LoadingOverlay from '@/components/LoadingOverlay';
import SeatTypeService from '@/services/seatType.service';
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const SeatRowForm = ({
	initialValues = { label: '', quantity: 1, seatTypeId: 0, roomId: 0 },
	submitText = 'Gửi',
	onSubmit,
}) => {
	const { data: seatTypes, isLoading } = useQuery(
		['seat-types'],
		SeatTypeService.getAll
	);

	if (isLoading) return <LoadingOverlay />;

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Yup.object().shape({
				label: Yup.string()
					.required('Vui lòng nhập nhãn của ghế')
					.length(1, 'Nhãn chỉ chứ 1 ký tự'),
				quantity: Yup.number()
					.required('Vui lòng nhập số lượng ghế')
					.min(1, 'Số ghế phải lớn hơn 0'),
				seatTypeId: Yup.number()
					.required('Vui lòng chọn loại ghể')
					.notOneOf([0], 'Vui lòng chọn loại ghể'),
			})}
			enableReinitialize
			onSubmit={onSubmit}
		>
			{({ values, errors, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit} style={{ padding: '20px 0' }}>
					<TextField
						autoFocus
						placeholder="Nhãn"
						label="Nhãn"
						value={values.label}
						name="label"
						onChange={handleChange}
						error={!!errors.label}
						helperText={errors.label}
						fullWidth
						size="small"
						style={{ marginBottom: 20 }}
					/>

					<TextField
						placeholder="Số ghế"
						label="Số ghế"
						value={values.quantity}
						name="quantity"
						onChange={handleChange}
						error={!!errors.quantity}
						helperText={errors.quantity}
						fullWidth
						size="small"
						style={{ marginBottom: 20 }}
					/>

					<FormControl
						fullWidth
						size="small"
						error={errors.seatTypeId}
					>
						<InputLabel>Loại ghế</InputLabel>

						<Select
							defaultValue={values.seatTypeId}
							label="Loại ghể"
							name="seatTypeId"
							onChange={handleChange}
							native
						>
							<option value="0" disabled>
								Chưa chọn
							</option>
							{seatTypes.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</Select>
					</FormControl>

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

export default SeatRowForm;
