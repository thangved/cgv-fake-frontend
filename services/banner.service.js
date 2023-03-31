import request from '@/utils/request';

class BannerService {
	static getAll() {
		return request.get('banners');
	}

	static getAllPublic() {
		return request.get('banners/public');
	}

	static create(payload) {
		return request.post('banners', payload);
	}

	static update(id, payload) {
		return request.put(`banners/${id}`, payload);
	}

	static delete(id) {
		return request.delete(`banners/${id}`);
	}

	static getById(id) {
		if (!id) return;
		return request.get(`banners/${id}`);
	}
}

export default BannerService;
