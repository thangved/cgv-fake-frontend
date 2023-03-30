import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import AccountService from '@/services/account.servive';
import { Avatar, Container } from '@mui/material';
import { DataGrid, viVN } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import styles from './Accounts.module.css';

const Accounts = () => {
	const { data: accounts, isLoading } = useQuery(
		['accounts'],
		AccountService.getAll
	);

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
				]}
				rows={accounts}
				loading={isLoading}
				localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
			/>
		</Container>
	);
};

Accounts.layout = AcpLayout;

export default Accounts;
