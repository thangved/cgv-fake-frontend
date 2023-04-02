import LoadingOverlay from '@/components/LoadingOverlay';
import MovieForm from '@/forms/movie';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditMovie = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: movie, isLoading } = useQuery(
		['banner', router.query.id],
		() => MovieService.getByIdOrSlug(router.query.id)
	);

	const handleUpdate = async (values) => {
		setLoading(true);
		try {
			await MovieService.update(router.query.id, values);
			router.back();
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading || !movie) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Cập nhật phim</h2>
				<MovieForm
					submitText="Cập nhật"
					initialValues={{
						...movie,
						categories: movie.categories.map((e) => e.id),
						countries: movie.countries.map((e) => e.id),
					}}
					onSubmit={handleUpdate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditMovie.layout = AcpLayout;

export default EditMovie;
