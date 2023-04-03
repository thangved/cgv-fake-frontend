import LoadingOverlay from '@/components/LoadingOverlay';
import ShowInMovieForm from '@/forms/showInMovie';
import ShowService from '@/services/show.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, viVN } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import styles from './CreateInCinema.module.css';

const CreateInCinema = ({ movieDetails, cinemaDetails }) => {
	const [adding, setAdding] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const {
		data: shows,
		isLoading,
		refetch,
	} = useQuery(
		['shows', 'cinemaId', cinemaDetails.id, 'movieId', movieDetails.id],
		() =>
			ShowService.getAll({
				cinemaId: cinemaDetails.id,
				movieId: movieDetails.id,
			})
	);

	const handleCreate = async (value) => {
		try {
			await ShowService.create(value);
			setAdding(false);
		} catch (error) {
			toast.error(error);
		} finally {
			refetch();
		}
	};

	const handleDelete = async () => {
		try {
			await ShowService.delete(deleteId);
		} catch (error) {
		} finally {
			refetch();
			setDeleteId(null);
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<span>{cinemaDetails.name}</span>
					<Button onClick={() => setAdding(!adding)}>
						{adding ? 'Hủy' : 'Thêm'}
					</Button>
				</div>

				{adding && (
					<Box padding={1}>
						<ShowInMovieForm
							submitText="Thêm suất chiếu"
							initialValues={{
								movieId: movieDetails.id,
								roomId: 0,
								languageId: 0,
								startAt: '0000-00-00T00:00',
								endAt: '0000-00-00T00:00',
								cinemaId: cinemaDetails.id,
							}}
							onSubmit={handleCreate}
						/>
					</Box>
				)}

				<DataGrid
					rows={shows}
					autoHeight
					density="compact"
					columns={[
						{
							field: 'language',
							headerName: 'Ngôn ngữ',
							flex: 1,
							renderCell({ value }) {
								return value.name;
							},
						},
						{
							field: 'room',
							headerName: 'Phòng chiếu',
							flex: 1,
							renderCell({ value }) {
								return value.name;
							},
						},
						{
							field: 'startAt',
							headerName: 'Giờ bắt đầu',
							renderCell({ value }) {
								return dayjs(value).format('DD/MM/YYYY HH:mm');
							},
							flex: 1,
						},
						{
							field: 'endAt',
							headerName: 'Giờ kết thúc',
							renderCell({ value }) {
								return dayjs(value).format('DD/MM/YYYY HH:mm');
							},
							flex: 1,
						},
						{
							field: 'action',
							type: 'actions',
							getActions({ row }) {
								return [
									<GridActionsCellItem
										label="Delete"
										icon={
											<FontAwesomeIcon icon={faTimes} />
										}
										key="delete"
										onClick={() => setDeleteId(row.id)}
									/>,
								];
							},
						},
					]}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
				/>
			</div>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa suất chiếu</DialogTitle>

				<DialogContent>Bạn có chắc xóa suất chiếu này?</DialogContent>

				<DialogActions>
					<Button variant="contained" onClick={handleDelete}>
						Xóa
					</Button>

					<Button onClick={() => setDeleteId(null)}>Hủy</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CreateInCinema;
