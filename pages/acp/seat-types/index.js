/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import SeatTypeService from '@/services/seatType.service';
import {
	faFileCirclePlus,
	faPen,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import {
	DataGrid,
	GridActionsCellItem,
	GridToolbarContainer,
	viVN,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

const Categories = () => {
	const {
		data: categories,
		isLoading,
		refetch,
	} = useQuery(['seat-types'], SeatTypeService.getAll);

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await SeatTypeService.delete(deleteId);
		} catch (error) {
			alert(error.response.message);
		} finally {
			setDeleteId(null);
			refetch();
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Loại ghế</h2>
				<DataGrid
					autoHeight
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Link href="/acp/seat-types/create">
									<Button
										startIcon={
											<FontAwesomeIcon
												icon={faFileCirclePlus}
											/>
										}
									>
										Thêm
									</Button>
								</Link>
							</GridToolbarContainer>
						),
					}}
					columns={[
						{
							field: 'id',
							headerName: 'Mã',
						},
						{
							field: 'name',
							headerName: 'Tên loại ghế',
							flex: 1,
						},
						{
							field: 'color',
							headerName: 'Màu',
							flex: 1,
							renderCell({ value }) {
								return (
									<div
										style={{
											width: 30,
											height: 30,
											background: value,
										}}
									></div>
								);
							},
						},
						{
							field: 'createdAt',
							headerName: 'Tạo vào',
							flex: 1,
							renderCell({ value }) {
								return dayjs(value).format('hh:mm, DD/MM/YYYY');
							},
						},
						{
							field: 'updatedAt',
							headerName: 'Cập nhật lần cuối',
							flex: 1,
							renderCell({ value }) {
								return dayjs(value).format('hh:mm, DD/MM/YYYY');
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
										icon={<FontAwesomeIcon icon={faPen} />}
										label="Edit"
										onClick={() => {
											router.push(
												`/acp/seat-types/${row.id}/edit`
											);
										}}
									/>,
									<GridActionsCellItem
										key="delete"
										icon={
											<FontAwesomeIcon icon={faTimes} />
										}
										label="Edit"
										onClick={() => {
											setDeleteId(row.id);
										}}
									/>,
								];
							},
						},
					]}
					rows={categories}
					loading={isLoading}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa thể loại phim</DialogTitle>
				<DialogContent>
					Bạn có muốn xóa thể lọại này? Những bộ phim có thể loại này
					có thể sẽ bị ảnh hưởng!
				</DialogContent>
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

Categories.layout = AcpLayout;

export default Categories;
