import axios, { AxiosError } from 'axios'
import { isServer } from './isServer'

export const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: 'https://dummyjson.com',
	headers: {
		'Content-Type': 'application/json',
		Authorization: !isServer()
			? `Bearer ${localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken')}`
			: undefined,
	},
})

axiosInstance.interceptors.response.use(undefined, (error) => {
	if (error instanceof AxiosError && error.status === 401) {
		const accessToken = axios
			.get('/api/refresh-session')
			.then((res) => {
				if (!error.config || !res.data) {
					throw new Error('No config or access token in error response')
				}
				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data}`
				error.config.headers['Authorization'] = `Bearer ${res.data}`
				return axios.request(error.config)
			})
			.catch(() => {
				delete axiosInstance.defaults.headers.common['Authorization']
				window.location.href = '/login'
			})
		return accessToken
	}

	return Promise.reject(error)
})
