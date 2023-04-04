/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import InvoiceService from '@/services/invoice.service';
import { currencyFormatter } from '@/utils/formatter';
import { DeleteOutlined, ListOutlined } from '@mui/icons-material';
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, viVN } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const Rooms = () => {
	const {
		data: invoices,
		isLoading,
		refetch,
	} = useQuery(['invoices'], () => InvoiceService.getAll({ all: true }));

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await InvoiceService.delete(deleteId);
		} catch (error) {
			toast.error(error);
		} finally {
			setDeleteId(null);
			refetch();
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Rạp phim</h2>
				<DataGrid
					autoHeight
					columns={[
						{
							field: 'id',
							headerName: 'Mã',
						},
						{
							field: 'account',
							headerName: 'Khách hàng',
							flex: 1,
							renderCell({ value }) {
								return value.fullName;
							},
						},
						{
							field: 'total',
							headerName: 'Tổng',
							renderCell({ value }) {
								return currencyFormatter.format(value);
							},
						},
						{
							field: 'createdAt',
							headerName: 'Tạo vào',
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
										key="details"
										icon={<ListOutlined />}
										label="Details"
										onClick={() => {
											router.push(
												`/acp/invoices/${row.id}`
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
					rows={invoices}
					loading={isLoading}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa hóa đơn</DialogTitle>
				<DialogContent>Bạn có muốn xóa hóa đơn này?</DialogContent>
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

Rooms.layout = AcpLayout;

export default Rooms;
