import LoadingOverlay from '@/components/LoadingOverlay';
import CategoryForm from '@/forms/category';
import AcpLayout from '@/layouts/AcpLayout';
import CategoryService from '@/services/category.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateCategory = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			await CategoryService.create(values);
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
				<h2 style={{ margin: '20px 0' }}>Thêm thể loại phim</h2>
				<CategoryForm submitText="Thêm" onSubmit={handleCreate} />
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateCategory.layout = AcpLayout;

export default CreateCategory;
