import LoadingOverlay from '@/components/LoadingOverlay';
import ProvinceForm from '@/forms/province';
import AcpLayout from '@/layouts/AcpLayout';
import ProvinceService from '@/services/province.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditProvince = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: province, isLoading } = useQuery(
		['province', router.query.id],
		() => ProvinceService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await ProvinceService.update(router.query.id, values);
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
				<h2 style={{ margin: '20px 0' }}>Cập nhật tỉnh thành</h2>
				<ProvinceForm
					submitText="Cập nhật"
					initialValues={province}
					onSubmit={handleUpdate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditProvince.layout = AcpLayout;

export default EditProvince;
