import request from '@/utils/request';

class ShowService {
	static getAll() {
		return request.get('shows');
	}

	static create(payload) {
		return request.post('shows', payload);
	}

	static update(id, payload) {
		return request.put(`shows/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`shows/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`shows/${id}`);
	}
}

export default ShowService;