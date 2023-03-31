import AuthService from '@/services/auth.service';
import GenderService from '@/services/gender.service';
import { setValue } from '@/store/userSlice';
import token from '@/utils/token';
import { Formik } from 'formik';
import { useId, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Button from '../Button';
import Input from '../Input';
import LoginWithGoogle from '../LoginWithGoogle';
import Modal from '../Modal';
import Select from '../Select';
import Tabs from '../Tabs';
import styles from './AuthModal.module.css';

const AuthModal = ({ open, onClose }) => {
	const [registerPayload, setRegisterPayload] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [key, setKey] = useState(Math.random());
	const { data: genders } = useQuery(['genders'], GenderService.getAll, {
		initialData: [],
	});

	const dispatch = useDispatch();

	const handleGoogleFailed = (result) => {
		setRegisterPayload(result);
		setCurrentIndex(1);
		setKey(Math.random());
	};

	const handleGoogleSuccess = () => {
		onClose();
		setRegisterPayload(null);
	};

	const handleLogin = async (values) => {
		try {
			const loginRes = await AuthService.login(values);
			const accessToken = loginRes.accessToken;
			token.token = accessToken;

			const authRes = await AuthService.auth();
			dispatch(setValue(authRes));
			onClose();
			setRegisterPayload(null);
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	const handleRegister = async (values) => {
		try {
			const registerRes = await AuthService.register({
				...values,
				accessToken: registerPayload.user.accessToken,
			});

			token.token = registerRes.accessToken;
			const authRes = await AuthService.auth();
			dispatch(setValue(authRes));
			onClose();
			setRegisterPayload(null);
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div
				style={{
					width: '100%',
					maxWidth: 360,
					margin: '0 auto',
					padding: '40px 0',
				}}
			>
				<Tabs
					key={key}
					initialIndex={currentIndex}
					items={[
						{
							label: 'Đăng nhập',
							component: (
								<Formik
									initialValues={{ email: '', password: '' }}
									validationSchema={Yup.object().shape({
										email: Yup.string()
											.email('Địa chỉ email không hợp lệ')
											.required('Vui lòng nhập email'),
										password: Yup.string().required(
											'Vui lòng nhập mật khẩu'
										),
									})}
									onSubmit={handleLogin}
								>
									{({
										values,
										errors,
										handleChange,
										handleSubmit,
									}) => (
										<form
											onSubmit={handleSubmit}
											style={{ padding: '20px 0' }}
										>
											<label htmlFor="email">Email</label>
											<Input
												id="email"
												placeholder="Email"
												name="email"
												value={values.email}
												onChange={handleChange}
											/>

											<div className={styles.error}>
												{errors.email}
											</div>

											<label htmlFor="password">
												Mật khẩu
											</label>
											<Input
												id="password"
												placeholder="Mật khẩu"
												name="password"
												type="password"
												value={values.password}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.password}
											</div>

											<Button type="submit" block>
												Đăng nhập
											</Button>

											<LoginWithGoogle
												onFailed={handleGoogleFailed}
												onSuccess={handleGoogleSuccess}
											>
												Đăng nhập với tài khoản Google
											</LoginWithGoogle>
										</form>
									)}
								</Formik>
							),
						},
						{
							label: 'Đăng ký',
							component: !!registerPayload ? (
								<Formik
									enableReinitialize
									initialValues={{
										fullName:
											registerPayload.user.displayName,
										email: registerPayload.user.email,
										genderId: 0,
										dateOfBirth: null,
									}}
									validationSchema={Yup.object().shape({
										fullName: Yup.string().required(
											'Vui lòng nhập họ tên'
										),
										email: Yup.string()
											.required('Vui lòng nhập email')
											.email(
												'Địa chỉ email không hợp lệ'
											),
										genderId: Yup.number().required(
											'Vui lòng chọn giới tính'
										),
										dateOfBirth: Yup.date().required(
											'Vui lòng nhập ngày sinh'
										),
										password: Yup.string().required(
											'Vui lòng nhập mật khẩu'
										),
										cfpassword: Yup.string()
											.required(
												'Vui lòng nhập lại mật khẩu'
											)
											.oneOf(
												[Yup.ref('password'), null],
												'Mật khẩu nhập lại không chính xác'
											),
									})}
									onSubmit={handleRegister}
								>
									{({
										values,
										errors,
										handleChange,
										handleSubmit,
									}) => (
										<form onSubmit={handleSubmit}>
											<label htmlFor="fullName">
												Họ tên
											</label>
											<Input
												placeholder="Họ tên"
												name="fullName"
												id="fullName"
												value={values.fullName}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.fullName}
											</div>

											<label htmlFor="email">Email</label>
											<Input
												readOnly
												placeholder="Email"
												name="email"
												id="email"
												value={values.email}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.email}
											</div>

											<label htmlFor="genderId">
												Giới tính
											</label>
											<Select
												placeholder="Giới tính"
												name="genderId"
												id="genderId"
												defaultValue="0"
												onChange={handleChange}
											>
												<option disabled value="0">
													Chưa chọn
												</option>
												{genders.map((e) => (
													<option
														key={e.id}
														value={e.id}
													>
														{e.name}
													</option>
												))}
											</Select>
											<div className={styles.error}>
												{errors.genderId}
											</div>

											<label htmlFor="dateOfBirth">
												Ngày sinh
											</label>
											<Input
												type="date"
												placeholder="Ngày sinh"
												name="dateOfBirth"
												id="dateOfBirth"
												value={values.dateOfBirth}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.dateOfBirth}
											</div>

											<label htmlFor="password">
												Mật khẩu
											</label>
											<Input
												type="password"
												placeholder="Mật khẩu"
												name="password"
												id="password"
												value={values.password}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.password}
											</div>

											<label htmlFor="cfpassword">
												Xác nhận mật khẩu
											</label>
											<Input
												type="password"
												placeholder="Xác nhận mật khẩu"
												name="cfpassword"
												id="cfpassword"
												value={values.cfpassword}
												onChange={handleChange}
											/>
											<div className={styles.error}>
												{errors.cfpassword}
											</div>

											<Button type="submit" block>
												Đăng ký
											</Button>

											<Button
												block
												outlined
												type="button"
												onClick={() =>
													setRegisterPayload(null)
												}
											>
												Hủy
											</Button>
										</form>
									)}
								</Formik>
							) : (
								<LoginWithGoogle
									onFailed={handleGoogleFailed}
									onSuccess={handleGoogleSuccess}
									style={{ marginTop: 20 }}
								>
									Đăng ký bằng tài khoản Google
								</LoginWithGoogle>
							),
						},
					]}
				></Tabs>
			</div>
		</Modal>
	);
};

export default AuthModal;
