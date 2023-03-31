import request from '@/utils/request';

class MovieService {
	static getAll(params = {}) {
		return request.get('movies', { params });
	}

	static create(payload) {
		return request.post('movies', payload);
	}

	static update(id, payload) {
		return request.put(`movies/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`movies/${id}`);
	}

	static getByIdOrSlug(id) {
		if (!id) return;
		return request.get(`movies/${id}`);
	}
}

export default MovieService;
