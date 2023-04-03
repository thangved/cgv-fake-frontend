import request from '@/utils/request';

class AccountService {
	static create(payload) {
		return request.post('accounts', payload);
	}
	static getAll() {
		return request.get('accounts');
	}

	static getById(id) {
		if (!id) return;
		return request.get(`accounts/${id}`);
	}

	static update(id, payload) {
		return request.put(`accounts/${id}`, payload);
	}

	static deleteById(id) {
		return request.delete(`accounts/${id}`);
	}
}

export default AccountService;
