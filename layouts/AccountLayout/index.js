/* eslint-disable @next/next/no-img-element */
import LoadingOverlay from '@/components/LoadingOverlay';
import Tabs from '@/components/Tabs';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import DefaultLayout from '../DefaultLayout';

const routes = ['/account', '/my-tickets'];

const AccountLayout = ({ children }) => {
	const currentUser = useSelector((state) => state.user.value);
	const router = useRouter();

	const currentIndex = routes.indexOf(router.pathname);

	if (!useAuth()) {
		return <LoadingOverlay />;
	}

	return (
		<DefaultLayout>
			<Container>
				<Row>
					<Col sm={12} md={3} style={{ marginTop: 20 }}>
						<img
							src={currentUser.avatar}
							alt="Avatar"
							width="100%"
							style={{ borderRadius: 5, maxWidth: 150 }}
						/>
					</Col>

					<Col sm={12} md={9}>
						<Tabs
							key={router.pathname}
							initialIndex={currentIndex}
							items={[
								{
									label: 'Tài khoản',
									component: children,
									onClick() {
										router.push('/account');
									},
								},
								{
									label: 'Vé của tôi',
									component: children,
									onClick() {
										router.push('/my-tickets');
									},
								},
							]}
						/>
					</Col>
				</Row>
			</Container>
		</DefaultLayout>
	);
};

export default AccountLayout;
