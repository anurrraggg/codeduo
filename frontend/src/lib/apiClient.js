import axios from 'axios';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL
		? `${import.meta.env.VITE_API_URL}/api`
		: 'https://codeduo.onrender.com/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
	
export default apiClient;


