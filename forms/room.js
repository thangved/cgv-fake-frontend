/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import CinemaService from '@/services/cinema.service';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useQuery } from 'react-query';
import * as Yup from 'yup';

const RoomForm = ({
	initialValues = { name: '', cinemaId: 0 },
	submitText = 'Gửi',
	onSubmit,
}) => {
	const { data: cinema, isLoading } = useQuery(
		['cinema', initialValues.cinemaId],
		() => CinemaService.getById(initialValues.cinemaId)
	);

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<Table style={{ marginBottom: 20 }}>
				<TableHead>
					<TableRow>
						<TableCell>Mã rạp</TableCell>
						<TableCell>Tên rạp</TableCell>
						<TableCell>Địa chỉ</TableCell>
						<TableCell>Tỉnh thành</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<TableRow>
						<TableCell>{cinema.id}</TableCell>
						<TableCell>{cinema.name}</TableCell>
						<TableCell>{cinema.address}</TableCell>
						<TableCell>{cinema.province.name}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Formik
				initialValues={initialValues}
				validationSchema={Yup.object().shape({
					name: Yup.string().required(
						'Vui lòng nhập tên phòng chiếu'
					),
				})}
				enableReinitialize
				onSubmit={onSubmit}
			>
				{({ values, errors, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<TextField
							style={{ marginBottom: 20 }}
							autoFocus
							placeholder="Tên phòng chiếu"
							label="Tên phòng chiếu"
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
		</>
	);
};

export default RoomForm;
