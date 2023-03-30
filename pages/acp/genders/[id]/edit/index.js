import LoadingOverlay from '@/components/LoadingOverlay';
import GenderForm from '@/forms/gender';
import AcpLayout from '@/layouts/AcpLayout';
import GenderService from '@/services/gender.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const EditGender = () => {
	const router = useRouter();

	const { data: gender, isLoading } = useQuery(
		['gender', router.query.id],
		() => GenderService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			await GenderService.update(router.query.id, values);
			router.back();
		} catch (error) {}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Cập nhật giới tính</h2>
			<GenderForm
				submitText="Cập nhật"
				initialValues={gender}
				onSubmit={handleUpdate}
			/>
		</Container>
	);
};

EditGender.layout = AcpLayout;

export default EditGender;
