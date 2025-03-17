import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function OAuthHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            axios
                .post('http://localhost:9000/api/kakao/auth', { code })
                .then((resp) => {
                    const { token } = resp.data;
                    if (token) {
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                        navigate('/movie/movieAll/1');
                    }
                })
                .catch((error) => {
                    console.error('Error during authentication', error);
                });
        }
    }, [navigate]);

    return <div>카카오 로그인 중...</div>;
}
