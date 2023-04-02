import LoadingOverlay from '@/components/LoadingOverlay';
import LanguageForm from '@/forms/language';
import AcpLayout from '@/layouts/AcpLayout';
import LanguageService from '@/services/language.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateLanguage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await LanguageService.create(values);
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
				<h2 style={{ margin: '20px 0' }}>Thêm ngôn ngữ</h2>
				<LanguageForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateLanguage.layout = AcpLayout;

export default CreateLanguage;
