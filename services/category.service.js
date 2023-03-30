import request from '@/utils/request';

class CategoryService {
	static getAll() {
		return request.get('categories');
	}

	static create(payload) {
		return request.post('categories', payload);
	}

	static update(id, payload) {
		return request.put(`categories/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`categories/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`categories/${id}`);
	}
}

export default CategoryService;
