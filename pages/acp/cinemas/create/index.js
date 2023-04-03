import LoadingOverlay from '@/components/LoadingOverlay';
import CinemaForm from '@/forms/cinema';
import AcpLayout from '@/layouts/AcpLayout';
import CinemaService from '@/services/cinema.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateCinema = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			const res = await CinemaService.create(values);
			router.push(`/acp/cinemas/${res.id}/edit`);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Thêm rạp phim</h2>
				<CinemaForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateCinema.layout = AcpLayout;

export default CreateCinema;
