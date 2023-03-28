import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Slider.module.css';

const Slider = ({ items = [] }) => {
	return (
		<Carousel
			className={styles.wrapper}
			swipeable
			infiniteLoop
			showThumbs={false}
			showStatus={false}
		>
			{items.map((e, index) => (
				<Link
					href={e.url}
					className={styles.item}
					key={index}
					style={{
						backgroundImage: `url(${e.image})`,
					}}
				></Link>
			))}
		</Carousel>
	);
};

export default Slider;
