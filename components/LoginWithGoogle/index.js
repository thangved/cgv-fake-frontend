import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

import Images from '@/assets/images';

import { auth } from '@/firebase';
import AuthService from '@/services/auth.service';
import { setValue } from '@/store/userSlice';
import token from '@/utils/token';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../LoadingOverlay';
import styles from './LoginWithGoogle.module.css';

const provider = new GoogleAuthProvider();

const LoginWithGoogle = ({ children, onFailed, onSuccess, ...props }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleLogin = async () => {
		try {
			setLoading(true);
			const result = await signInWithPopup(auth, provider);

			const accessToken = result.user.accessToken;

			try {
				const res = await AuthService.loginWithGoogle({ accessToken });

				token.token = res.accessToken;

				const authRes = await AuthService.auth();
				dispatch(setValue(authRes));
				onSuccess();
			} catch (error) {
				onFailed(result);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className={styles.wrapper} onClick={handleLogin} {...props}>
				<Image
					src={Images.googleIcon}
					width={20}
					height={20}
					alt="Google icon"
				/>

				<span>{children || 'Đăng nhập'}</span>
			</div>
			{loading && (
				<LoadingOverlay message="Kết nối với tài khoản Google của bạn..." />
			)}
		</>
	);
};

export default LoginWithGoogle;
