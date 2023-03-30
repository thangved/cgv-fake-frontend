/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import useAuth from '@/hooks/useAuth';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import styles from './GetTicketLayout.module.css';

const GetTicketLayout = ({ children }) => {
	const router = useRouter();
	const currentUser = useSelector((state) => state.user.value);

	if (!useAuth()) {
		return <LoadingOverlay />;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.button} onClick={() => router.back()}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</div>

				<div className={styles.title}>
					<h4>Chọn ghế</h4>
				</div>

				<Link href="/account">
					<img
						width={30}
						src={currentUser.avatar}
						alt={currentUser.fullName}
						style={{ borderRadius: 5 }}
					/>
				</Link>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default GetTicketLayout;
