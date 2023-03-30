import request from '@/utils/request';

class AccountService {
	static async getAll() {
		return request.get('accounts');
	}
}

export default AccountService;
