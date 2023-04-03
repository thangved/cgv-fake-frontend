import Link from 'next/link';
import { Col, Row } from 'react-grid-system';
import styles from './CinemaByMovie.module.css';
import dayjs from 'dayjs';

const CinemaByMovie = ({ details }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cinema}>{details.cinema.name}</div>
			<Row className={styles.inner}>
				<Col xs={12} md={3}>
					<h4>{details.language.name}</h4>
				</Col>
				<Col xs={12} md={9} className={styles.times}>
					{details.shows.map((e) => (
						<Link
							href={`/tickets?showId=${e.id}`}
							key={e.id}
							className={styles.time}
						>
							{dayjs(e.startAt).format('HH:mm')}
						</Link>
					))}
				</Col>
			</Row>
		</div>
	);
};

export default CinemaByMovie;
