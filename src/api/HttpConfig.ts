import axios, { AxiosInstance } from 'axios';

const HttpConfig: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

HttpConfig.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken') || '{}');

    if (accessToken.accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken.accessToken}`)
    }

    return config;
});

export default HttpConfig;