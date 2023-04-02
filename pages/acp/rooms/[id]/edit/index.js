import LoadingOverlay from '@/components/LoadingOverlay';
import RoomForm from '@/forms/room';
import AcpLayout from '@/layouts/AcpLayout';
import RoomService from '@/services/room.service';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const EditRoom = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: room, isLoading } = useQuery(['room', router.query.id], () =>
		RoomService.getById(router.query.id)
	);

	const handleUpdate = async (values) => {
		try {
			setLoading(true);
			await RoomService.update(router.query.id, values);
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
				<h2 style={{ margin: '20px 0' }}>Cập nhật phòng chiếu</h2>
				<RoomForm
					submitText="Cập nhật"
					initialValues={room}
					onSubmit={handleUpdate}
				/>

				<Link href={`/acp/rooms/${router.query.id}/seats`}>
					<Button
						startIcon={<FontAwesomeIcon icon={faCouch} />}
						variant="outlined"
						style={{ marginTop: 10 }}
					>
						Chỉnh sửa ghế
					</Button>
				</Link>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditRoom.layout = AcpLayout;

export default EditRoom;
