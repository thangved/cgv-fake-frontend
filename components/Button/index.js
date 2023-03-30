import clsx from 'clsx';

import styles from './Button.module.css';

const Button = ({ children, block = false, outlined = false, ...props }) => {
	return (
		<button
			className={clsx(styles.wrapper, {
				[styles.outlined]: outlined,
				[styles.block]: block,
			})}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
