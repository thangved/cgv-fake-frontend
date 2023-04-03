import LoadingOverlay from '@/components/LoadingOverlay';
import SeatPreview from '@/components/SeatPreview';
import RoomForm from '@/forms/room';
import AcpLayout from '@/layouts/AcpLayout';
import RoomService from '@/services/room.service';
import SeatRowService from '@/services/seatRow.service';
import { Container } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import styles from './EditRoom.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const EditRoom = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { data: room, isLoading } = useQuery(['room', router.query.id], () =>
		RoomService.getById(router.query.id)
	);

	const { data: seatRows, isLoading: ld2 } = useQuery(
		['seats', 'roomId', router.query.id],
		() => SeatRowService.getAll({ roomId: router.query.id })
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

				<h3 style={{ margin: '20px 0' }}>Sơ đồ ghế</h3>

				<Link
					href={`/acp/rooms/${router.query.id}/seats`}
					className={styles.seats}
				>
					{!ld2 && <SeatPreview rows={seatRows} />}

					<div className={styles.overlay}>
						<FontAwesomeIcon icon={faPen} />
					</div>
				</Link>
			</Container>
			{loading && <LoadingOverlay />}
		</>
	);
};

EditRoom.layout = AcpLayout;

export default EditRoom;
