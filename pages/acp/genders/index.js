import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import GenderService from '@/services/gender.service';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';

const Genders = () => {
	const {
		data: genders,
		isLoading,
		refetch,
	} = useQuery(['genders'], GenderService.getAll);

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await GenderService.delete(deleteId);
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
				<h2 style={{ margin: '20px 0' }}>Giới tính</h2>
				<DataGrid
					autoHeight
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Link href="/acp/genders/create">
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
							headerName: 'Mã giới tính',
						},
						{
							field: 'name',
							headerName: 'Tên giới tính',
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
										icon={<FontAwesomeIcon icon={faPen} />}
										label="Edit"
										onClick={() => {
											router.push(
												`/acp/genders/${row.id}/edit`
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
					rows={genders}
					loading={isLoading}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa giới tính</DialogTitle>
				<DialogContent>
					Bạn có muốn xóa giới tính này? Những tài khoản có giới tính
					này có thể sẽ bị ảnh hưởng!
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

Genders.layout = AcpLayout;

export default Genders;
