import LoadingOverlay from '@/components/LoadingOverlay';
import RoomForm from '@/forms/room';
import AcpLayout from '@/layouts/AcpLayout';
import RoomService from '@/services/room.service';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const CreateRoom = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleCreate = async (values) => {
		try {
			setLoading(true);
			const res = await RoomService.create(values);
			router.push(`/acp/rooms/${res.id}/edit`);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Thêm phòng chiếu</h2>
				<RoomForm
					initialValues={{
						name: '',
						cinemaId: router.query.cinemaId,
					}}
					submitText="Thêm"
					onSubmit={handleCreate}
				/>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

CreateRoom.layout = AcpLayout;

export default CreateRoom;
