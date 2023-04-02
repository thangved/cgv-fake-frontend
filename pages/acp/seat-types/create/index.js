import LoadingOverlay from '@/components/LoadingOverlay';
import CategoryForm from '@/forms/category';
import SeatTypeForm from '@/forms/seatType';
import AcpLayout from '@/layouts/AcpLayout';
import SeatTypeService from '@/services/seatType.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateCategory = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await SeatTypeService.create(values);
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
				<h2 style={{ margin: '20px 0' }}>Thêm loại ghế</h2>
				<SeatTypeForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateCategory.layout = AcpLayout;

export default CreateCategory;
