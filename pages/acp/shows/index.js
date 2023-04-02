/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import BannerService from '@/services/banner.service';
import {
	faEarthAsia,
	faFileCirclePlus,
	faLock,
	faPen,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Chip,
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

const Banners = () => {
	const {
		data: banners,
		isLoading,
		refetch,
	} = useQuery(['banners'], BannerService.getAll);

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await BannerService.delete(deleteId);
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
				<h2 style={{ margin: '20px 0' }}>Banner</h2>
				<DataGrid
					rowHeight={300}
					autoHeight
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Link href="/acp/banners/create">
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
							field: 'image',
							headerName: 'Ảnh',
							flex: 1,
							renderCell({ value }) {
								return (
									<img
										src={value}
										alt="Banner"
										style={{
											maxHeight: 300,
											maxWidth: '100%',
										}}
									/>
								);
							},
						},
						{
							field: 'url',
							headerName: 'Đường dẫn',
							flex: 1,
						},
						{
							field: 'visible',
							headerName: 'Hiển thị',
							flex: 1,
							renderCell({ value }) {
								return (
									<Chip
										icon={
											<FontAwesomeIcon
												icon={
													value ? faEarthAsia : faLock
												}
											/>
										}
										label={value ? 'Hiển thị' : 'Ẩn'}
										color={value ? 'success' : 'error'}
									/>
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
												`/acp/banners/${row.id}/edit`
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
				<DialogTitle>Xóa banner</DialogTitle>
				<DialogContent>Bạn có muốn xóa banner này?</DialogContent>
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

Banners.layout = AcpLayout;

export default Banners;
