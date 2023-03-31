import MovieForm from '@/forms/movie';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const CreateMovie = () => {
	const router = useRouter();

	const handleCreate = async (values) => {
		try {
			await MovieService.create(values);
			router.back();
		} catch (error) {
			alert(error.response.message);
		}
	};

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Thêm phim</h2>
			<MovieForm submitText="Thêm" onSubmit={handleCreate} />
		</Container>
	);
};

CreateMovie.layout = AcpLayout;

export default CreateMovie;
