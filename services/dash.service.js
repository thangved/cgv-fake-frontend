import request from '@/utils/request';

class DashService {
	static dash() {
		return request.get('dash');
	}
}

export default DashService;
