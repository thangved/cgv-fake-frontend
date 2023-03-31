import LoadingOverlay from '@/components/LoadingOverlay';
import BannerForm from '@/forms/banner';
import MovieForm from '@/forms/movie';
import AcpLayout from '@/layouts/AcpLayout';
import MovieService from '@/services/movie.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const EditGender = () => {
	const router = useRouter();

	const { data: movie, isLoading } = useQuery(
		['banner', router.query.id],
		() => MovieService.getByIdOrSlug(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			await MovieService.update(router.query.id, values);
			router.back();
		} catch (error) {}
	};

	if (isLoading || !movie) return <LoadingOverlay />;

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Cập nhật phim</h2>
			<MovieForm
				submitText="Cập nhật"
				initialValues={{
					...movie,
					categories: movie.categories.map((e) => e.id),
				}}
				onSubmit={handleUpdate}
			/>
		</Container>
	);
};

EditGender.layout = AcpLayout;

export default EditGender;
