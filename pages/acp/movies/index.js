/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import {
	AddOutlined,
	ConfirmationNumberOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@mui/icons-material';
import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
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

const Movies = () => {
	const {
		data: movies,
		isLoading,
		isError,
		refetch,
	} = useQuery(['movies'], MovieService.getAll);

	const [deleteId, setDeleteId] = useState(null);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			await MovieService.delete(deleteId);
		} catch (error) {
			alert(error.response.message);
		} finally {
			setDeleteId(null);
			refetch();
		}
	};

	if (isLoading || isError) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Phim</h2>
				<DataGrid
					rowHeight={300}
					autoHeight
					slots={{
						toolbar: () => (
							<GridToolbarContainer>
								<Link href="/acp/movies/create">
									<Button startIcon={<AddOutlined />}>
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
							field: 'title',
							headerName: 'Tiêu đề phim',
							flex: 1,
						},
						{
							field: 'brief',
							headerName: 'Mô tả ngắn',
							flex: 1,
						},
						{
							field: 'slug',
							headerName: 'Slug',
							flex: 1,
						},
						{
							field: 'verPoster',
							headerName: 'Poster dọc',
							flex: 1,
							renderCell({ value, row }) {
								return (
									<img
										src={value}
										style={{
											maxWidth: '100%',
											maxHeight: '100%',
										}}
										alt={row.title}
									/>
								);
							},
						},
						{
							field: 'horPoster',
							headerName: 'Poster ngang',
							flex: 1,
							renderCell({ value, row }) {
								return (
									<img
										src={value}
										style={{
											maxWidth: '100%',
											maxHeight: '100%',
										}}
										alt={row.title}
									/>
								);
							},
						},
						{
							field: 'show',
							headerName: 'Suất chiếu',
							renderCell({ row }) {
								return (
									<Link
										href={{
											pathname: '/acp/shows/create',
											query: {
												movieId: row.id,
											},
										}}
									>
										<IconButton>
											<ConfirmationNumberOutlined />
										</IconButton>
									</Link>
								);
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
												`/acp/movies/${row.id}/edit`
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
					rows={movies}
					loading={isLoading}
					localeText={
						viVN.components.MuiDataGrid.defaultProps.localeText
					}
					density="compact"
				/>
			</Container>

			<Dialog open={!!deleteId}>
				<DialogTitle>Xóa phim</DialogTitle>
				<DialogContent>
					Bạn có muốn xóa bộ phim này? những hóa đơn liên quan tới bộ
					phim này có thể sẽ bị ảnh hưởng!
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

Movies.layout = AcpLayout;

export default Movies;
