import LoadingOverlay from '@/components/LoadingOverlay';
import SeatTypeForm from '@/forms/seatType';
import AcpLayout from '@/layouts/AcpLayout';
import SeatTypeService from '@/services/seatType.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditCategory = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: seatType, isLoading } = useQuery(
		['seat-type', router.query.id],
		() => SeatTypeService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await SeatTypeService.update(router.query.id, values);
			router.back();
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Cập nhật loại ghế</h2>
				<SeatTypeForm
					submitText="Cập nhật"
					initialValues={seatType}
					onSubmit={handleUpdate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditCategory.layout = AcpLayout;

export default EditCategory;
