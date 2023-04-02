import request from '@/utils/request';

class LanguageService {
	static getAll() {
		return request.get('languages');
	}

	static create(payload) {
		return request.post('languages', payload);
	}

	static update(id, payload) {
		return request.put(`languages/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`languages/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`languages/${id}`);
	}
}

export default LanguageService;
