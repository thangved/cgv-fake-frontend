import styles from './SeatPreview.module.css';

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
	return (
		<div className={styles.room}>
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
