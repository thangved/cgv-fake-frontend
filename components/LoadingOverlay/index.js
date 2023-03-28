import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LoadingOverlay.module.css';

const LoadingOverlay = () => {
	return (
		<div className={styles.wrapper}>
			<FontAwesomeIcon
				icon={faSpinner}
				spin
				color="var(--primary)"
				size="2x"
			/>
		</div>
	);
};

export default LoadingOverlay;
