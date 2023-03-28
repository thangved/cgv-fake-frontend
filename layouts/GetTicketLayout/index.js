import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import styles from './GetTicketLayout.module.css';

const GetTicketLayout = ({ children }) => {
	const router = useRouter();

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.button} onClick={() => router.back()}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>

				<div>
					<h4>Chọn ghế</h4>
				</div>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default GetTicketLayout;
