import { useEffect, useRef } from 'react';
import styles from './SeatPreview.module.css';
import autoAnimate from '@formkit/auto-animate';

const SeatRow = ({ quantity, color, label }) => {
	const element = [];

	for (let i = 0; i < quantity; i++) {
		element.push(
			<div
				key={i}
				className={styles.seat}
				style={{
					'--seat-color': color,
				}}
			>
				{label}
				{i + 1}
			</div>
		);
	}

	return <div className={styles.row}>{element}</div>;
};

const SeatPreview = ({ rows }) => {
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div className={styles.room} ref={parent}>
			<div className={styles.screen}>
				Màn hình
				<div className={styles.line}></div>
			</div>

			{rows.map((e) => (
				<SeatRow key={e.id} {...e} color={e.seattype.color} />
			))}
		</div>
	);
};

export default SeatPreview;
