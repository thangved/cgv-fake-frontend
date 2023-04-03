import AccountForm from '@/forms/account';
import AcpLayout from '@/layouts/AcpLayout';
import AccountService from '@/services/account.service';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const CreateAccount = () => {
	const router = useRouter();
	const handleCreate = async (values) => {
		try {
			await AccountService.create(values);
			router.back();
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Tạo tài khoản</h2>

			<AccountForm submitText="Tạo" onSubmit={handleCreate} />
		</Container>
	);
};

CreateAccount.layout = AcpLayout;

export default CreateAccount;
