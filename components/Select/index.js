import styles from './Select.module.css';

const Select = ({ children, ...props }) => {
	return (
		<select className={styles.wrapper} {...props}>
			{children}
		</select>
	);
};

export default Select;
