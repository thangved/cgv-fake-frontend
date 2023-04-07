import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './Tabs.module.css';
import autoAnimate from '@formkit/auto-animate';

const Tabs = ({ items = [], initialIndex = 0 }) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const parent = useRef(null);

	useEffect(() => {
		parent.current && autoAnimate(parent.current);
	}, [parent]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.labels}>
				{items.map((e, index) => (
					<div
						key={index}
						className={clsx(styles.label, {
							[styles.active]: currentIndex === index,
						})}
						onClick={() => {
							if (e.onClick) return e.onClick();
							setCurrentIndex(index);
						}}
					>
						{e.label}
					</div>
				))}
			</div>

			<div className={styles.content} key={currentIndex} ref={parent}>
				{items[currentIndex].component}
			</div>
		</div>
	);
};

export default Tabs;
