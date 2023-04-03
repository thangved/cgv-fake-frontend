/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import GetTicketLayout from '@/layouts/GetTicketLayout';
import ShowService from '@/services/show.service';
import { addTicket } from '@/store/getTicketSlice';
import getTicketStore from '@/store/getTicketStore';
import { currencyFormatter } from '@/utils/formatter';
import { faAngleRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './Ticket.module.css';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

const SeatRow = ({ row }) => {
	const dispatch = useDispatch();
	const details = useSelector((state) => state.getTicket.details);

	return (
		<div className={styles.seats}>
			<Head>
				<title>Chọn ghế</title>
			</Head>
			{row.seats.map((seat) => (
				<button
					className={clsx(styles.seat, {
						[styles.booked]: seat.booked,
						[styles.selected]: !!details.find(
							(e) => e.id == row.id && e.seatId === seat.id
						),
					})}
					style={{
						'--seat-color': row.type.color,
					}}
					key={seat.id}
					disabled={seat.booked}
					onClick={() => {
						dispatch(
							addTicket({
								label: row.label,
								seatId: seat.id,
								id: row.id,
								price: row.price,
								type: row.type,
							})
						);
					}}
				>
					{row.label}
					{seat.id}
				</button>
			))}
		</div>
	);
};

const Ticket = () => {
	const router = useRouter();
	const { details, total } = useSelector((state) => state.getTicket);
	const [openConfirm, setOpenConfirm] = useState(false);

	const mainRef = useRef();
	const { data: showDetails, isLoading } = useQuery(
		['show', router.query.showId],
		() => ShowService.getById(router.query.showId)
	);

	const { data: seats } = useQuery(
		['seats', 'showId', router.query.showId],
		() => ShowService.getSeats(router.query.showId),
		{ initialData: [] }
	);

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.main} ref={mainRef}>
					<TransformWrapper centerOnInit pinch={{ excluded: false }}>
						<TransformComponent wrapperClass={styles.full}>
							<div className={styles.room}>
								<div className={styles.screen}>
									Màn hình
									<div className={styles.line}></div>
								</div>

								<div style={{ height: 100 }}></div>

								{seats.map((e) => (
									<SeatRow row={e} key={e.id} />
								))}
							</div>
						</TransformComponent>
					</TransformWrapper>
				</div>

				{showDetails && (
					<div
						className={styles.details}
						style={{
							backgroundImage: `url(${showDetails.movie.horPoster})`,
						}}
					>
						<img
							src={showDetails.movie.verPoster}
							alt={showDetails.title}
						/>

						<div className={styles.texts}>
							<h3>{showDetails.movie.title}</h3>

							<p>
								<FontAwesomeIcon icon={faClock} />{' '}
								{showDetails.movie.minutes} phút
							</p>

							<p>Rạp: {showDetails.room.cinema.name}</p>

							<p>Phòng chiếu: {showDetails.room.name}</p>
						</div>
					</div>
				)}

				<div className={styles.footer}>
					<div className={styles.price}>
						Tổng: {currencyFormatter.format(total)}
					</div>
					<div
						className={styles.button}
						onClick={() => setOpenConfirm(true)}
					>
						Thanh toán
						<span style={{ width: 10 }}></span>
						<FontAwesomeIcon icon={faAngleRight} />
					</div>
				</div>
			</div>
			{isLoading && <LoadingOverlay />}

			<Modal
				title="Xác nhận đặt vé"
				open={openConfirm}
				onClose={() => setOpenConfirm(false)}
			>
				<p>Vui lòng kiểm tra lại thông tin đặt vé</p>

				<table className={styles.table}>
					<thead>
						<tr>
							<th>STT</th>
							<th>Ghế</th>
							<th>Loại ghế</th>
							<th>Thành tiền</th>
						</tr>
					</thead>

					<tbody>
						{details.map((e, index) => (
							<tr key={`${e.id}-${e.seatId}`}>
								<td>{index + 1}</td>
								<td>
									{e.label}
									{e.seatId}
								</td>
								<td>{e.type.name}</td>
								<td>{currencyFormatter.format(e.price)}</td>
							</tr>
						))}
					</tbody>

					<tfoot>
						<tr>
							<td colSpan={3}>Tổng</td>
							<td>{currencyFormatter.format(total)}</td>
						</tr>
					</tfoot>
				</table>

				<Button block>Đặt vé</Button>
				<Button block outlined onClick={() => setOpenConfirm(false)}>
					Hủy
				</Button>
			</Modal>
		</>
	);
};

const WithRedux = () => {
	return (
		<Provider store={getTicketStore}>
			<Ticket />
		</Provider>
	);
};

WithRedux.layout = GetTicketLayout;

export default WithRedux;
