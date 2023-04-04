import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import InvoiceService from '@/services/invoice.service';
import { currencyFormatter } from '@/utils/formatter';
import { Container } from '@mui/system';
import { DataGrid, viVN } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styles from './Invoice.module.css';

const EditRoom = () => {
	const router = useRouter();

	const { data: invoice, isLoading } = useQuery(
		['invoice', router.query.id],
		() => InvoiceService.getById(router.query.id)
	);

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<Container component="div" className={styles.wrapper}>
				<h2 style={{ margin: '20px 0' }}>Chi tiết hóa đơn</h2>

				<p>Mã hóa đơn: {invoice.id}</p>
				<p>Khách hàng: {invoice.account.fullName}</p>
				<p>
					Tạo vào:{' '}
					{dayjs(invoice.createdAt).format('HH:mm DD/MM/YYYY')}
				</p>

				<p>Tổng: {currencyFormatter.format(invoice.total)}</p>

				<DataGrid
					rows={invoice.tickets}
					autoHeight
					columns={[
						{ field: 'id', headerName: 'Mã vé' },
						{
							field: 'seat',
							headerName: 'Số ghế',
							renderCell({ row }) {
								return row.seatrow.label + row.seatId;
							},
							flex: 1,
						},
						{
							field: 'cinema',
							headerName: 'Rạp',
							flex: 1,
							renderCell({ row }) {
								return row.show.room.cinema.name;
							},
						},
						{
							field: 'room',
							headerName: 'Phòng chiếu',
							flex: 1,
							renderCell({ row }) {
								return row.show.room.name;
							},
						},
						{
							field: 'movie',
							headerName: 'Phim',
							flex: 1,
							renderCell({ row }) {
								return row.show.movie.title;
							},
						},
						{
							field: 'price',
							headerName: 'Thành tiền',
							renderCell({ value }) {
								return currencyFormatter.format(value);
							},
							flex: 1,
						},
					]}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>
		</>
	);
};

EditRoom.layout = AcpLayout;

export default EditRoom;
