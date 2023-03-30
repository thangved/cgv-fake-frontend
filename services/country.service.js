import request from '@/utils/request';

class CountryService {
	static getAll() {
		return request.get('countries');
	}

	static create(payload) {
		return request.post('countries', payload);
	}

	static update(id, payload) {
		return request.put(`countries/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`countries/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`countries/${id}`);
	}
}

export default CountryService;
