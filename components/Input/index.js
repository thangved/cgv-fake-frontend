import clsx from 'clsx';
import styles from './Input.module.css';

const Input = ({ ...props }) => {
	return (
		<input
			type="text"
			name=""
			id=""
			{...props}
			className={clsx(styles.wrapper, props.className)}
		/>
	);
};

export default Input;
