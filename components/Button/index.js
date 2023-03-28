import clsx from 'clsx';

import styles from './Button.module.css';

const Button = ({ children, outlined = false, ...props }) => {
	return (
		<div
			className={clsx(styles.wrapper, {
				[styles.outlined]: outlined,
			})}
			{...props}
		>
			{children}
		</div>
	);
};

export default Button;
