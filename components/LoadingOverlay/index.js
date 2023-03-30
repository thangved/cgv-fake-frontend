import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LoadingOverlay.module.css';

const LoadingOverlay = ({ message }) => {
	return (
		<div className={styles.wrapper}>
			<FontAwesomeIcon
				icon={faSpinner}
				spin
				color="var(--primary)"
				size="2x"
			/>
			{message && <span>{message}</span>}
		</div>
	);
};

export default LoadingOverlay;
