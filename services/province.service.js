import request from '@/utils/request';

class ProvinceService {
	static getAll() {
		return request.get('provinces');
	}

	static create(payload) {
		return request.post('provinces', payload);
	}

	static update(id, payload) {
		return request.put(`provinces/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`provinces/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`provinces/${id}`);
	}
}

export default ProvinceService;
