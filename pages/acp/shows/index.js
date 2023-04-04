import LoadingOverlay from '@/components/LoadingOverlay';
import schedulerTranslations from '@/configs/translations';
import ShowInRoomForm from '@/forms/showInRoom';
import AcpLayout from '@/layouts/AcpLayout';
import CinemaService from '@/services/cinema.service';
import RoomService from '@/services/room.service';
import ShowService from '@/services/show.service';
import { Scheduler } from '@aldabil/react-scheduler';
import { Box, Container, FormControl, InputLabel, Select } from '@mui/material';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const Shows = () => {
	const router = useRouter();
	const [cinemaId, setCinemaId] = useState(router.query.cinemaId || 1);
	const [roomId, setRoomId] = useState(router.query.roomId || 0);

	const { data: cinemas } = useQuery(['cinemas'], CinemaService.getAll);

	const { data: rooms } = useQuery(
		['rooms', 'cinemaId', cinemaId],
		() => RoomService.getAll({ cinemaId }),
		{ initialData: [] }
	);

	const { data: shows, refetch } = useQuery(
		['shows', 'cinemaId', cinemaId, 'roomId', roomId],
		() => ShowService.getAll({ roomId, cinemaId }),
		{ initialData: [] }
	);

	const handleCreate = async (values) => {
		await ShowService.create(values);
	};

	if (!cinemas || !rooms) return <LoadingOverlay />;

	return (
		<>
			<Container>
				<h2 style={{ margin: '20px 0' }}>Lịch chiếu</h2>

				<Row style={{ marginBottom: 20 }}>
					<Col xs={12} md={6}>
						<FormControl fullWidth size="small">
							<InputLabel>Rạp</InputLabel>
							<Select
								label="Rạp"
								native
								value={cinemaId}
								onChange={(event) => {
									setCinemaId(event.target.value);
									setRoomId(0);
								}}
							>
								{cinemas.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Col>
					<Col xs={12} md={6}>
						<FormControl fullWidth size="small">
							<InputLabel>Phòng chiếu</InputLabel>
							<Select
								label="Phòng chiếu"
								native
								value={roomId}
								onChange={(event) =>
									setRoomId(event.target.value)
								}
							>
								<option value="0">Tất cả</option>
								{rooms.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Col>
				</Row>

				<Scheduler
					onEventDrop={async (
						droppedOn,
						updatedEvent,
						originalEvent
					) => {
						try {
							await ShowService.update(updatedEvent.event_id, {
								startAt: updatedEvent.start,
								endAt: updatedEvent.end,
							});

							return updatedEvent;
						} catch (error) {
							toast.error(error);
							return originalEvent;
						}
					}}
					key={`${cinemaId}-${roomId}-${shows.length}`}
					view="week"
					events={shows.map((e) => ({
						event_id: e.id,
						title: e.movie.title,
						start: new Date(e.startAt),
						end: new Date(e.endAt),
					}))}
					locale={vi}
					editable={false}
					translations={schedulerTranslations}
					hourFormat="24"
					day={{
						startHour: 0,
						endHour: 23,
						step: 60,
						navigation: true,
					}}
					week={{
						startHour: 0,
						endHour: 23,
						navigation: true,
					}}
					customEditor={(scheduler) => {
						if (!roomId) return scheduler.close();
						return (
							<Box padding={3}>
								<h2 style={{ marginBottom: 20 }}>
									Thêm suất chiếu
								</h2>
								<ShowInRoomForm
									initialValues={{
										movieId: 0,
										roomId: roomId,
										languageId: 0,
										startAt: scheduler.state.start.value,
										endAt: scheduler.state.end.value,
									}}
									submitText="Tạo"
									onSubmit={async (values) => {
										try {
											await handleCreate(values);
											scheduler.close();
										} catch (error) {
											toast.error(error);
										} finally {
											refetch();
										}
									}}
									onCancel={scheduler.close}
								/>
							</Box>
						);
					}}
					onDelete={async (deleteId) => {
						try {
							await ShowService.delete(deleteId);
						} catch (error) {
							toast.error(error);
						} finally {
							refetch();
						}
					}}
				/>
			</Container>
		</>
	);
};

Shows.layout = AcpLayout;

export default Shows;
