import { useRef } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import GetTicketLayout from '@/layouts/GetTicketLayout';

import styles from './Ticket.module.css';

const Ticket = () => {
	const mainRef = useRef();

	return (
		<div className={styles.wrapper}>
			<div className={styles.main} ref={mainRef}>
				<TransformWrapper>
					<TransformComponent>
						<div
							className={styles.room}
							style={{
								width: mainRef.current?.offsetWidth,
								height: mainRef.current?.offsetHeight,
							}}
						>
							<div className={styles.screen}>
								Màn hình
								<div className={styles.line}></div>
							</div>
						</div>
					</TransformComponent>
				</TransformWrapper>
			</div>
			<div className={styles.footer}>
				<div className={styles.price}>99.000đ</div>
				<div className={styles.button}>Đặt ngay</div>
			</div>
		</div>
	);
};

Ticket.layout = GetTicketLayout;

export default Ticket;
