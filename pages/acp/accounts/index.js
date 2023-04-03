import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import AccountService from '@/services/account.servive';
import {
	AddCircleOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@mui/icons-material';
import {
	Avatar,
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
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const Accounts = () => {
	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();
	const {
		data: accounts,
		isLoading,
		refetch,
	} = useQuery(['accounts'], AccountService.getAll);

	const handleDelete = async () => {
		try {
			await AccountService.deleteById(deleteId);
		} catch (error) {
			toast.error(error);
		} finally {
			setDeleteId(null);
			refetch();
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Tài khoản</h2>
			<DataGrid
				autoHeight
				columns={[
					{
						field: 'avatar',
						headerName: '',
						renderCell({ value }) {
							return <Avatar src={value} />;
						},
					},
					{
						field: 'fullName',
						headerName: 'Họ tên',
						flex: 1,
					},
					{
						field: 'email',
						headerName: 'Email',
						flex: 1,
					},
					{
						field: 'dateOfBirth',
						headerName: 'Ngày sinh',
						renderCell({ value }) {
							if (!value) return <i>Chưa đặt</i>;

							return dayjs(value).format('DD/MM/YYYY');
						},
						flex: 1,
					},
					{
						field: 'gender',
						headerName: 'Giới tính',
						renderCell({ value }) {
							if (!value) return <i>Chưa đặt</i>;

							return value?.name;
						},
						flex: 1,
					},
					{
						field: 'admin',
						headerName: 'Quản trị',
						renderCell({ value }) {
							return value ? 'Có' : 'Không';
						},
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
									icon={<EditOutlined />}
									label="Edit"
									onClick={() => {
										router.push(
											`/acp/accounts/${row.id}/edit`
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
				rows={accounts}
				loading={isLoading}
				localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
				slots={{
					toolbar: () => (
						<GridToolbarContainer>
							<Link href="/acp/accounts/create">
								<Button startIcon={<AddCircleOutlined />}>
									Thêm
								</Button>
							</Link>
						</GridToolbarContainer>
					),
				}}
			/>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa tài khoản</DialogTitle>
				<DialogContent>
					Bạn có muốn xóa tài khoản này? Những hóa đơn của tài khoản
					này có thể sẽ bị ảnh hưởng.
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleDelete}>
						Xóa
					</Button>
					<Button onClick={() => setDeleteId(null)}>Hủy</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

Accounts.layout = AcpLayout;

export default Accounts;
