import styles from './Modal.module.css';

const Modal = ({ open = false, title, children, onClose = () => {} }) => {
	return (
		open && (
			<div className={styles.wrapper} onClick={onClose}>
				<div
					className={styles.modal}
					onClick={(e) => e.stopPropagation()}
				>
					{title && (
						<div className={styles.title}>
							<h4>{title}</h4>
						</div>
					)}

					<div className={styles.body}>{children}</div>
				</div>
			</div>
		)
	);
};

export default Modal;
