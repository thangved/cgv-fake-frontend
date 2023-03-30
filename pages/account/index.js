import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingOverlay from '@/components/LoadingOverlay';
import Select from '@/components/Select';
import AccountLayout from '@/layouts/AccountLayout';
import AuthService from '@/services/auth.service';
import GenderService from '@/services/gender.service';
import { setValue } from '@/store/userSlice';
import token from '@/utils/token';
import { Formik } from 'formik';
import Head from 'next/head';
import { useState } from 'react';
import { Col, Row } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from './Account.module.css';

export async function getStaticProps() {
	try {
		const genders = await GenderService.getAll();
		return {
			props: {
				genders,
			},
		};
	} catch (error) {}
}

const Account = ({ genders = [] }) => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.user.value);

	const handleSubmit = async (values) => {
		try {
			setLoading(true);
			await AuthService.update(values);

			const authRes = await AuthService.auth();
			dispatch(setValue(authRes));
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		token.token = '';
		dispatch(setValue(null));
	};

	return (
		<>
			<Head>
				<title>Cài đặt tài khoản</title>
			</Head>

			{loading && <LoadingOverlay message="Đang cập nhật..." />}

			<Formik
				enableReinitialize
				initialValues={{
					fullName: currentUser.fullName,
					dateOfBirth: currentUser.dateOfBirth,
					email: currentUser.email,
					genderId: currentUser.gender?.id,
				}}
				validationSchema={Yup.object().shape({
					fullName: Yup.string().required('Vui lòng nhập họ tên'),
					dateOfBirth: Yup.date(
						'Ngày sinh phải là một ngày hợp lệ'
					).required('Vui lòng chọn ngày sinh'),
					genderId: Yup.number().required('Vui lòng chọn giới tính'),
				})}
				onSubmit={handleSubmit}
			>
				{({ values, handleSubmit, handleChange, errors }) => (
					<form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
						<label htmlFor="fullName">Họ tên</label>
						<Input
							id="fullName"
							name="fullName"
							placeholder="Họ tên"
							value={values.fullName}
							onChange={handleChange}
						/>
						<div className={styles.error}>{errors.fullName}</div>

						<label htmlFor="dateOfBirth">Ngày sinh</label>

						<Input
							id="dateOfBirth"
							name="dateOfBirth"
							placeholder="Ngày sinh"
							type="date"
							value={values.dateOfBirth || ''}
							onChange={handleChange}
						/>
						<div className={styles.error}>{errors.dateOfBirth}</div>

						<label htmlFor="email">Email</label>
						<Input
							id="email"
							name="email"
							placeholder="Ngày sinh"
							disabled
							value={values.email}
							onChange={handleChange}
						/>
						<div className={styles.error}>{errors.email}</div>

						<label htmlFor="gender">Giới tính</label>
						<Select
							defaultValue="0"
							value={values.genderId}
							name="genderId"
							id="gender"
							onChange={handleChange}
						>
							<option value="0" disabled>
								Chưa chọn
							</option>
							{genders.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</Select>

						<Row gutterWidth={2} style={{ marginTop: 10 }}>
							<Col xs={12} md={3}>
								<Button block type="submit">
									Lưu
								</Button>
							</Col>

							<Col xs={12} md={3}>
								<Button
									block
									outlined
									type="button"
									onClick={handleLogout}
								>
									Đăng xuất
								</Button>
							</Col>
						</Row>
					</form>
				)}
			</Formik>
		</>
	);
};

Account.layout = AccountLayout;

export default Account;
