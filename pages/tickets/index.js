import { useRef, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import clsx from 'clsx';

import GetTicketLayout from '@/layouts/GetTicketLayout';
import seats from '@/mock/seats';

import styles from './Ticket.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import useAuth from '@/hooks/useAuth';
import LoadingOverlay from '@/components/LoadingOverlay';

const SeatRow = ({ details }) => {
	const [selected, setSelected] = useState([]);

	return (
		<div className={styles.seats}>
			<Head>
				<title>Chọn ghế</title>
			</Head>
			{details.seats.map((e, index) => (
				<button
					className={clsx(styles.seat, {
						[styles.booked]: e.booked,
						[styles.selected]: selected.includes(e.id),
					})}
					style={{
						'--seat-color': details.type.color,
					}}
					key={e.id}
					disabled={e.booked}
					onClick={() =>
						setSelected((prev) => {
							if (prev.includes(e.id)) {
								return prev.filter((_e) => _e !== e.id);
							}

							return [...prev, e.id];
						})
					}
				>
					{details.label}
					{index + 1}
				</button>
			))}
		</div>
	);
};

const Ticket = () => {
	const mainRef = useRef();

	if (!useAuth()) {
		return <LoadingOverlay />;
	}

	return (
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
								<SeatRow details={e} key={e.id} />
							))}
						</div>
					</TransformComponent>
				</TransformWrapper>
			</div>
			<div className={styles.footer}>
				<div className={styles.price}>99.000đ</div>
				<div className={styles.button}>
					Thanh toán
					<span style={{ width: 10 }}></span>
					<FontAwesomeIcon icon={faAngleRight} />
				</div>
			</div>
		</div>
	);
};

Ticket.layout = GetTicketLayout;

export default Ticket;
