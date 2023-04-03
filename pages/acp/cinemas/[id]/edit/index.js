import LoadingOverlay from '@/components/LoadingOverlay';
import CinemaForm from '@/forms/cinema';
import AcpLayout from '@/layouts/AcpLayout';
import CinemaService from '@/services/cinema.service';
import RoomService from '@/services/room.service';
import {
	AddCircleOutlined,
	CalendarMonthOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { Container } from '@mui/system';
import { DataGrid, GridActionsCellItem, viVN } from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditCinema = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: cinema, isLoading } = useQuery(
		['cinema', router.query.id],
		() => CinemaService.getById(router.query.id)
	);

	const {
		data: rooms,
		isLoading: loading2,
		refetch,
	} = useQuery(['room', 'cinemaId', router.query.id], () =>
		RoomService.getAll({ cinemaId: router.query.id })
	);

	const [deleteId, setDeleteId] = useState(null);

	const handleDelete = async () => {
		try {
			await RoomService.delete(deleteId);
		} catch (error) {
			toast.error(error);
		} finally {
			setDeleteId(null);
			refetch();
		}
	};

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await CinemaService.update(router.query.id, values);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading || loading2 || !cinema) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Cập nhật rạp phim</h2>
				<CinemaForm
					submitText="Cập nhật"
					initialValues={cinema}
					onSubmit={handleUpdate}
				/>

				<h3 style={{ margin: '20px 0' }}>Phòng chiếu</h3>

				<Link
					href={{
						pathname: '/acp/rooms/create',
						query: {
							cinemaId: cinema.id,
						},
					}}
				>
					<Button startIcon={<AddCircleOutlined />}>
						Thêm phòng chiếu
					</Button>
				</Link>

				<DataGrid
					autoHeight
					density="compact"
					columns={[
						{
							field: 'id',
							headerName: 'Mã phòng',
						},
						{
							field: 'name',
							headerName: 'Tên phòng',
							flex: 1,
						},
						{
							field: 'scheduler',
							headerName: 'Lịch chiếu',
							renderCell({ row }) {
								return [
									<GridActionsCellItem
										key="scheduler"
										icon={<CalendarMonthOutlined />}
										onClick={() =>
											router.push({
												pathname: '/acp/shows',
												query: {
													roomId: row.id,
													cinemaId: cinema.id,
												},
											})
										}
									/>,
								];
							},
						},
						{
							field: 'action',
							type: 'actions',
							headerName: 'Hành động',
							getActions({ row }) {
								return [
									<GridActionsCellItem
										key="edit"
										icon={<EditOutlined />}
										label="Edit"
										onClick={() => {
											router.push(
												`/acp/rooms/${row.id}/edit`
											);
										}}
									/>,
									<GridActionsCellItem
										key="delete"
										icon={<DeleteOutlined />}
										label="Edit"
										onClick={() => {
											setDeleteId(row.id);
										}}
									/>,
								];
							},
						},
					]}
					rows={rooms}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
				/>
			</Container>
			{loading && <LoadingOverlay />}
			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa phòng chiếu</DialogTitle>
				<DialogContent>Bạn có muốn xóa phòng này?</DialogContent>
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

EditCinema.layout = AcpLayout;

export default EditCinema;
