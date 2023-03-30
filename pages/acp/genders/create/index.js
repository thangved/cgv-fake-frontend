import GenderForm from '@/forms/gender';
import AcpLayout from '@/layouts/AcpLayout';
import GenderService from '@/services/gender.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const CreateGender = () => {
	const router = useRouter();

	const handleCreate = async (values) => {
		try {
			await GenderService.create(values);
			router.back();
		} catch (error) {
			alert(error.response.message);
		}
	};

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Thêm giới tính</h2>
			<GenderForm submitText="Thêm" onSubmit={handleCreate} />
		</Container>
	);
};

CreateGender.layout = AcpLayout;

export default CreateGender;
