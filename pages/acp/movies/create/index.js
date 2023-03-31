import LoadingOverlay from '@/components/LoadingOverlay';
import MovieForm from '@/forms/movie';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateMovie = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await MovieService.create(values);
			router.back();
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Thêm phim</h2>
				<MovieForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateMovie.layout = AcpLayout;

export default CreateMovie;
