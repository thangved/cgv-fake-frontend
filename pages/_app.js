import DefaultLayout from '@/layouts/DefaultLayout';
import AuthService from '@/services/auth.service';
import { store } from '@/store';
import { auth, setValue } from '@/store/userSlice';
import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

config.autoAddCss = false;

const AuthComponent = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user?.value);

	useEffect(() => {
		if (user) return;

		const fetchUser = async () => {
			try {
				const res = await AuthService.auth();
				dispatch(setValue(res));
			} catch (error) {}
		};

		fetchUser();
	}, [dispatch, user]);

	return null;
};

const App = ({ Component, pageProps }) => {
	const Layout = Component.layout || DefaultLayout;

	return (
		<Provider store={store}>
			<AuthComponent />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
};

export default App;
