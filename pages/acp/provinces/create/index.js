import LoadingOverlay from '@/components/LoadingOverlay';
import ProvinceForm from '@/forms/province';
import AcpLayout from '@/layouts/AcpLayout';
import ProvinceService from '@/services/province.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateProvince = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await ProvinceService.create(values);
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
				<h2 style={{ margin: '20px 0' }}>Thêm tỉnh thành</h2>
				<ProvinceForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateProvince.layout = AcpLayout;

export default CreateProvince;
