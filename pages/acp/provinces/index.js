/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import ProvinceService from '@/services/province.service';
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

const Provinces = () => {
	const {
		data: banners,
		isLoading,
		refetch,
	} = useQuery(['provinces'], ProvinceService.getAll);

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await ProvinceService.delete(deleteId);
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
				<h2 style={{ margin: '20px 0' }}>Tỉnh thành</h2>
				<DataGrid
					autoHeight
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Link href="/acp/provinces/create">
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
							headerName: 'Tên tỉnh',
							flex: 1,
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
												`/acp/provinces/${row.id}/edit`
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
					rows={banners}
					loading={isLoading}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa tỉnh thành</DialogTitle>
				<DialogContent>Bạn có muốn xóa tỉnh thành này?</DialogContent>
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

Provinces.layout = AcpLayout;

export default Provinces;
