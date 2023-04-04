import LoadingOverlay from '@/components/LoadingOverlay';
import SeatPreview from '@/components/SeatPreview';
import SeatRowForm from '@/forms/seatRow';
import GetTicketLayout from '@/layouts/GetTicketLayout';
import RoomService from '@/services/room.service';
import SeatRowService from '@/services/seatRow.service';
import {
	CancelOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, viVN } from '@mui/x-data-grid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './EditSeat.module.css';

const alphabet = 'ABCDEDFGHIJKLMNOPQRSTUVWXYZ';

const CreateModal = ({ open, payload, onClose, refetch }) => {
	const handleCreate = async (values) => {
		try {
			await SeatRowService.create(values);
			onClose();
		} catch (error) {
		} finally {
			refetch();
		}
	};
	return (
		open && (
			<Dialog open onClose={onClose}>
				<DialogTitle>Thêm hàng ghế</DialogTitle>
				<DialogContent>
					<SeatRowForm
						submitText="Thêm"
						initialValues={payload}
						onSubmit={handleCreate}
					/>
				</DialogContent>
			</Dialog>
		)
	);
};

const EditModal = ({ open, payload, onClose, refetch }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleUpdate = async (values) => {
		try {
			await SeatRowService.update(payload.id, values);
			onClose();
		} catch (error) {
		} finally {
			refetch();
		}
	};

	const handleDelete = async () => {
		try {
			await SeatRowService.delete(payload.id);
			onClose();
		} catch (error) {
		} finally {
			setAnchorEl(null);
			refetch();
		}
	};

	return (
		open && (
			<Dialog open onClose={onClose}>
				<DialogTitle>Thêm hàng ghế</DialogTitle>
				<DialogContent>
					<SeatRowForm
						submitText="Lưu"
						initialValues={payload}
						onSubmit={handleUpdate}
					/>

					<Button
						color="error"
						variant="outlined"
						onClick={({ target }) => setAnchorEl(target)}
					>
						Xóa
					</Button>

					<Menu anchorEl={anchorEl} open={!!anchorEl}>
						<MenuItem onClick={handleDelete}>
							<ListItemIcon>
								<DeleteOutlined />
							</ListItemIcon>
							<ListItemText>Xóa hàng ghế</ListItemText>
						</MenuItem>

						<MenuItem onClick={() => setAnchorEl(null)}>
							<ListItemIcon>
								<CancelOutlined />
							</ListItemIcon>
							<ListItemText>Hủy</ListItemText>
						</MenuItem>
					</Menu>
				</DialogContent>
			</Dialog>
		)
	);
};

const EditSeats = () => {
	const router = useRouter();

	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [updatePayload, setUpdatePayload] = useState(null);

	const {
		data: room,
		isLoading,
		isError,
	} = useQuery(['room', router.query.id], () =>
		RoomService.getById(router.query.id)
	);

	const {
		data: seatRows,
		refetch,
		isLoading: loading2,
	} = useQuery(['seat-rows', 'roomId', router.query.id], () =>
		SeatRowService.getAll({ roomId: router.query.id })
	);

	if (isLoading || isError || loading2) return <LoadingOverlay />;

	return (
		<>
			<Head>
				<title>Chỉnh sửa ghế phòng chiếu</title>
			</Head>
			<div className={styles.wrapper}>
				<div className={styles.main}>
					<TransformWrapper centerOnInit pinch={{ excluded: false }}>
						<TransformComponent wrapperClass={styles.full}>
							<SeatPreview rows={seatRows} />
						</TransformComponent>
					</TransformWrapper>
				</div>
				<div className={styles.sidebar}>
					<h3>Rạp: {room.cinema?.name}</h3>
					<h4>Phòng chiếu: {room.name}</h4>

					<Button
						style={{ margin: '10px 0' }}
						variant="outlined"
						fullWidth
						onClick={() => setOpenCreateModal(true)}
					>
						Thêm hàng ghế
					</Button>

					<DataGrid
						autoHeight
						rows={seatRows}
						density="compact"
						columns={[
							{
								field: 'label',
								headerName: 'Nhãn',
								flex: 1,
							},
							{
								field: 'quantity',
								headerName: 'Số ghế',
								flex: 1,
							},
							{
								field: 'seattype',
								headerName: 'Loại ghế',
								renderCell({ value }) {
									return value.name;
								},
								flex: 1,
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
												setUpdatePayload(row);
											}}
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
			</div>

			<CreateModal
				payload={{
					label: alphabet[seatRows.length],
					quantity: 15,
					seatTypeId: 0,
					roomId: router.query.id,
				}}
				open={openCreateModal}
				refetch={refetch}
				onClose={() => setOpenCreateModal(false)}
			/>

			<EditModal
				payload={updatePayload}
				open={!!updatePayload}
				refetch={refetch}
				onClose={() => setUpdatePayload(null)}
			/>
		</>
	);
};

EditSeats.layout = ({ children }) => (
	<GetTicketLayout title="Chỉnh sửa ghế">{children}</GetTicketLayout>
);

export default EditSeats;
