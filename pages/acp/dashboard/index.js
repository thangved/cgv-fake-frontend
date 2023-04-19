import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import DashService from '@/services/dash.service';
import { currencyFormatter } from '@/utils/formatter';
import {
	AccountCircleOutlined,
	AttachMoney,
	ConfirmationNumberOutlined,
	ReceiptOutlined,
	RoomOutlined,
	SensorDoorOutlined,
} from '@mui/icons-material';
import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';

const DashCard = ({ title, content, icon, ...props }) => (
	<Grid item xs={12} md={6} {...props}>
		<Card variant="outlined" sx={{ position: 'relative' }}>
			<CardContent>
				<Typography gutterBottom>{title}</Typography>
				<Typography variant="h5">{content}</Typography>

				<Box
					position="absolute"
					right={0}
					bottom={0}
					sx={{ transform: 'rotate(-20deg)', opacity: 0.3 }}
				>
					{React.cloneElement(icon, { sx: { fontSize: 80 } })}
				</Box>
			</CardContent>
		</Card>
	</Grid>
);

const Dashboard = () => {
	const { data: dash, isLoading } = useQuery(['dash'], DashService.dash);

	if (isLoading) return <LoadingOverlay />;
	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Thống kê</h2>

			<h3 style={{ margin: '20px 0' }}>Tổng quan</h3>

			<Grid container spacing={2}>
				<DashCard
					title="Doanh thu"
					content={currencyFormatter.format(dash.revenue)}
					icon={<AttachMoney />}
				/>

				<DashCard
					title="Số khách hàng"
					content={dash.numCustomer}
					icon={<AccountCircleOutlined />}
				/>

				<DashCard
					title="Số vé"
					content={dash.numTicket}
					icon={<ConfirmationNumberOutlined />}
				/>

				<DashCard
					title="Số hóa đơn"
					content={dash.numInvoice}
					icon={<ReceiptOutlined />}
				/>

				<DashCard
					title="Số rạp"
					content={dash.numCinema}
					icon={<RoomOutlined />}
				/>

				<DashCard
					title="Số phòng chiếu"
					content={dash.numRoom}
					icon={<SensorDoorOutlined />}
				/>
			</Grid>

			<h3 style={{ margin: '20px 0' }}>Thống kê theo rạp</h3>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Mã rạp</TableCell>
						<TableCell>Tên rạp</TableCell>
						<TableCell>Tỉnh thành</TableCell>
						<TableCell>Số vé</TableCell>
						<TableCell>Doanh thu</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{dash.cinemas.map(({ cinema, total, numTicket }) => (
						<TableRow key={cinema.id}>
							<TableCell>{cinema.id}</TableCell>
							<TableCell>{cinema.name}</TableCell>
							<TableCell>{cinema.province.name}</TableCell>
							<TableCell>{numTicket}</TableCell>
							<TableCell>
								{currencyFormatter.format(total)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

Dashboard.layout = AcpLayout;

export default Dashboard;
