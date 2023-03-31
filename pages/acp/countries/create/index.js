import CountryForm from '@/forms/country';
import AcpLayout from '@/layouts/AcpLayout';
import CountryService from '@/services/country.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';

const CreateCountry = () => {
	const router = useRouter();

	const handleCreate = async (values) => {
		try {
			await CountryService.create(values);
			router.back();
		} catch (error) {
			alert(error.response.message);
		}
	};

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Thêm quốc gia</h2>
			<CountryForm submitText="Thêm" onSubmit={handleCreate} />
		</Container>
	);
};

CreateCountry.layout = AcpLayout;

export default CreateCountry;
