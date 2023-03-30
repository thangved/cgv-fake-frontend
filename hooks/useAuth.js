import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const useAuth = () => {
	const currentUser = useSelector((state) => state.user.value);
	const checked = useSelector((state) => state.user.checked);

	const router = useRouter();

	if (!currentUser && !checked) return false;

	if (!currentUser) {
		router.push('/');
		return false;
	}

	return true;
};

export default useAuth;
