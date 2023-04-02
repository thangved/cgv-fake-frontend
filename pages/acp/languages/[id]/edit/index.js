import LoadingOverlay from '@/components/LoadingOverlay';
import LanguageForm from '@/forms/language';
import AcpLayout from '@/layouts/AcpLayout';
import LanguageService from '@/services/language.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditBanner = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: language, isLoading } = useQuery(
		['language', router.query.id],
		() => LanguageService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await LanguageService.update(router.query.id, values);
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
				<LanguageForm
					submitText="Cập nhật"
					initialValues={language}
					onSubmit={handleUpdate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditBanner.layout = AcpLayout;

export default EditBanner;
