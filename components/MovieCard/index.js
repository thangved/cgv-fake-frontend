import clsx from 'clsx';
import Link from 'next/link';
import { AspectRatio } from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css';

import styles from './MovieCard.module.css';

const MovieCard = ({ details, ratio = 1.7, dark = false }) => {
	return (
		<Link
			href={details.url}
			className={clsx(styles.wrapper, {
				[styles.dark]: dark,
			})}
		>
			<AspectRatio
				ratio={ratio}
				className={styles.image}
				style={{
					backgroundImage: `url(${details.image})`,
				}}
			>
				<div className={styles.overlay}>
					<div className={styles.button}>Mua vé</div>
				</div>
			</AspectRatio>

			<div className={styles.text}>
				<h3>{details.title}</h3>
				<span>{details.brief}</span>
			</div>
		</Link>
	);
};

export default MovieCard;
