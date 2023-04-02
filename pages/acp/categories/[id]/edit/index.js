import LoadingOverlay from '@/components/LoadingOverlay';
import BannerForm from '@/forms/banner';
import AcpLayout from '@/layouts/AcpLayout';
import BannerService from '@/services/banner.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditCategory = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: banner, isLoading } = useQuery(
		['banner', router.query.id],
		() => BannerService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await BannerService.update(router.query.id, values);
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
				<h2 style={{ margin: '20px 0' }}>Cập nhật banner</h2>
				<BannerForm
					submitText="Cập nhật"
					initialValues={banner}
					onSubmit={handleUpdate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditCategory.layout = AcpLayout;

export default EditCategory;
