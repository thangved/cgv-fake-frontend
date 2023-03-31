import LoadingOverlay from '@/components/LoadingOverlay';
import CountryForm from '@/forms/country';
import AcpLayout from '@/layouts/AcpLayout';
import CountryService from '@/services/country.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const EditCountry = () => {
	const router = useRouter();

	const { data: gender, isLoading } = useQuery(
		['gender', router.query.id],
		() => CountryService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			await CountryService.update(router.query.id, values);
			router.back();
		} catch (error) {}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Cập nhật quốc gia</h2>
			<CountryForm
				submitText="Cập nhật"
				initialValues={gender}
				onSubmit={handleUpdate}
			/>
		</Container>
	);
};

EditCountry.layout = AcpLayout;

export default EditCountry;
