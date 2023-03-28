import clsx from 'clsx';
import { useState } from 'react';

import styles from './Tabs.module.css';

const Tabs = ({ items = [], initialIndex = 0 }) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	return (
		<div className={styles.wrapper}>
			<div className={styles.labels}>
				{items.map((e, index) => (
					<div
						key={index}
						className={clsx(styles.label, {
							[styles.active]: currentIndex === index,
						})}
						onClick={() => setCurrentIndex(index)}
					>
						{e.label}
					</div>
				))}
			</div>

			<div className={styles.content} key={currentIndex}>
				{items[currentIndex].component}
			</div>
		</div>
	);
};

export default Tabs;
