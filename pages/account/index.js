/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import AccountLayout from '@/layouts/AccountLayout';
import genders from '@/mock/genders';
import token from '@/utils/token';
import { Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from './Account.module.css';

export async function getStaticProps() {
	try {
		return {
			props: {
				genders,
			},
		};
	} catch (error) {}
}

const Account = ({ genders = [] }) => {
	const currentUser = useSelector((state) => state.user.value);
	const router = useRouter();

	const handleSubmit = async (values) => {
		try {
			console.log(values);
		} catch (error) {}
	};

	return (
		<>
			<Head>
				<title>Cài đặt tài khoản</title>
			</Head>

			<Formik
				enableReinitialize
				initialValues={{
					fullName: currentUser.fullName,
					dateOfBirth: currentUser.dateOfBirth,
					email: currentUser.email,
					gender: currentUser.gender?.id,
				}}
				validationSchema={Yup.object().shape({
					fullName: Yup.string().required('Vui lòng nhập họ tên'),
					dateOfBirth: Yup.date(
						'Ngày sinh phải là một ngày hợp lệ'
					).required('Vui lòng chọn ngày sinh'),
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
							value={values.gender}
							name="gender"
							id="gender"
							onChange={handleChange}
						>
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
									onClick={() => {
										token.token = '';
										router.reload();
									}}
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
