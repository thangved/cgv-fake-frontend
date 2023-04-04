import LoadingOverlay from '@/components/LoadingOverlay';
import DefaultLayout from '@/layouts/DefaultLayout';
import AuthService from '@/services/auth.service';
import { store } from '@/store';
import { checked, setValue } from '@/store/userSlice';
import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';

config.autoAddCss = false;

const queryClient = new QueryClient();

const Authentication = () => {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const isChecked = useSelector((state) => state.user.checked);

	useEffect(() => {
		if (isChecked || user) return;

		const fetchUser = async () => {
			try {
				setLoading(true);
				const res = await AuthService.auth();
				dispatch(setValue(res));
			} catch (error) {
			} finally {
				setLoading(false);
				dispatch(checked());
			}
		};

		fetchUser();
	}, [dispatch, isChecked, user]);

	return loading && <LoadingOverlay message="Đang đăng nhập" />;
};

const App = ({ Component, pageProps }) => {
	const Layout = Component.layout || DefaultLayout;

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Authentication />
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Layout>
						<Head>
							<title>CGV Fake</title>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</LocalizationProvider>
				<Toaster position="top-center" />
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
