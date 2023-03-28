import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

import Images from '@/assets/images';

import { auth } from '@/firebase';
import { useState } from 'react';
import LoadingOverlay from '../LoadingOverlay';
import styles from './LoginWithGoogle.module.css';

const provider = new GoogleAuthProvider();

const LoginWithGoogle = () => {
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		try {
			setLoading(true);
			const result = await signInWithPopup(auth, provider);
			console.log(result);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className={styles.wrapper} onClick={handleLogin}>
				<Image
					src={Images.googleIcon}
					width={20}
					height={20}
					alt="Google icon"
				/>

				<span>Đăng nhập</span>
			</div>
			{loading && <LoadingOverlay />}
		</>
	);
};

export default LoginWithGoogle;
