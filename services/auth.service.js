import request from '@/utils/request';

class AuthService {
	static login({ accessToken }) {
		return request.post('auth/login', { accessToken });
	}
	static auth() {
		return request.get('auth');
	}
	static update(payload) {
		return request.put('auth', payload);
	}
}

export default AuthService;
