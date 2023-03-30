import BannerForm from '@/forms/banner';
import AcpLayout from '@/layouts/AcpLayout';
import BannerService from '@/services/banner.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const CreateBanner = () => {
	const router = useRouter();

	const handleCreate = async (values) => {
		try {
			await BannerService.create(values);
			router.back();
		} catch (error) {
			alert(error.response.message);
		}
	};

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Thêm banner</h2>
			<BannerForm submitText="Thêm" onSubmit={handleCreate} />
		</Container>
	);
};

CreateBanner.layout = AcpLayout;

export default CreateBanner;
