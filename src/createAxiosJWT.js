import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { API_URL } from './constant';

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post(
            API_URL + `account/refresh-token`,
            {},
            {
                headers: { Authorization: `Bearer ${refreshToken}` },
            }
        );
        return res.data;
    } catch (err) {
        // return navigation('/');
        console.log(err);
    }
};

const createAxiosJWT = () => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const decodedToken = jwt_decode(accessToken);
                try {
                    if (decodedToken.exp < Date.now() / 1000) {
                        const tokens = await refreshToken();
                        localStorage.setItem('access_token', tokens.accessToken);
                        localStorage.setItem('refresh_token', tokens.refreshToken);
                        config.headers['Authorization'] = 'Bearer ' + tokens.accessToken;
                    } else config.headers['Authorization'] = 'Bearer ' + accessToken;
                } catch (error) {
                    console.log(error);
                }
            }
            return config;
        },
        (err) => {
            console.log(err);
            const navigate = useNavigate();
            navigate('/');
            // return Promise.reject(err);
        }
    );
    return newInstance;
};

export default createAxiosJWT;
