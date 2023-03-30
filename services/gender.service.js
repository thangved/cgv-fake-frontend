import request from '@/utils/request';

class GenderService {
	static getAll() {
		return request.get('genders');
	}

	static create(payload) {
		return request.post('genders', payload);
	}

	static update(id, payload) {
		return request.put(`genders/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`genders/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`genders/${id}`);
	}
}

export default GenderService;
