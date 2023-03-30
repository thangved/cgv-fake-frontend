import request from '@/utils/request';

class AuthService {
	static loginWithGoogle({ accessToken }) {
		return request.post('auth/google', { accessToken });
	}
	static register(payload) {
		return request.post('auth/register', payload);
	}
	static login(payload) {
		return request.post('auth/login', payload);
	}
	static auth() {
		return request.get('auth');
	}
	static update(payload) {
		return request.put('auth', payload);
	}
}

export default AuthService;
