import LoadingOverlay from '@/components/LoadingOverlay';
import BannerForm from '@/forms/banner';
import AcpLayout from '@/layouts/AcpLayout';
import BannerService from '@/services/banner.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateBanner = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await BannerService.create(values);
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
				<h2 style={{ margin: '20px 0' }}>Thêm banner</h2>
				<BannerForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateBanner.layout = AcpLayout;

export default CreateBanner;
