import LoadingOverlay from '@/components/LoadingOverlay';
import AccountForm from '@/forms/account';
import AcpLayout from '@/layouts/AcpLayout';
import AccountService from '@/services/account.servive';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditAccount = () => {
	const router = useRouter();

	const { data: account, isLoading } = useQuery(
		['account', router.query.id],
		() => AccountService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			await AccountService.update(router.query.id, values);
			router.back();
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	if (isLoading) return <LoadingOverlay />;

	return (
		<Container>
			<h2 style={{ margin: '20px 0' }}>Cập nhật tài khoản</h2>
			<AccountForm
				submitText="Cập nhật"
				initialValues={account}
				onSubmit={handleUpdate}
				hidePassword
			/>
		</Container>
	);
};

EditAccount.layout = AcpLayout;

export default EditAccount;
