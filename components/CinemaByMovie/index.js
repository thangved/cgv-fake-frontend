import Link from 'next/link';
import { Col, Row } from 'react-grid-system';
import styles from './CinemaByMovie.module.css';

const CinemaByMovie = ({ details }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cinema}>{details.cinema}</div>
			<Row className={styles.inner}>
				<Col xs={12} md={3}>
					<h4>{details.language}</h4>
				</Col>
				<Col xs={12} md={9} className={styles.times}>
					{details.shows.map((e) => (
						<Link
							href={`/tickets?showId=${e.id}`}
							key={e.id}
							className={styles.time}
						>
							{e.time}
						</Link>
					))}
				</Col>
			</Row>
		</div>
	);
};

export default CinemaByMovie;
