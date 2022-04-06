import axios from 'axios';

const instance = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,
    timeout: 10000
});

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {


        if (error.response.status === 401) {
            localStorage.removeItem("user");
            clearToken();
            window.location.href='/';
        }

        return Promise.reject(error);
    }
);

const authService = axios.create({
    baseURL: `http://localhost:8080/api/auth`,
    timeout: 10000
});

const currentUser = JSON.parse(localStorage.getItem('user'));

if (currentUser?.accessToken) {
    console.log('Se inicializa axios con token de localstorage');
    instance.defaults.headers.common['Authorization'] = `Bearer ${currentUser.accessToken}`;
    authService.defaults.headers.common['Authorization'] = `Bearer ${currentUser.accessToken}`;
} else {
    console.log('Se inicializa axios sin autenticacion');
}

function clearToken() {
    delete instance.defaults.headers.common['Authorization'];
    delete authService.defaults.headers.common['Authorization'];
}

function getErrorMessage(error) {
    let msg = '';
    try {
        if (error.response.data.payload != null) {
            msg = error.response.data.payload.message;
        } else if (error.response.data.msg != null) {
            msg = error.response.data.msg;
        } else {
            msg = 'Ha ocurrido un error.';
        }
        return msg;
    } catch (error) {
        return 'Ha ocurrido un error.';
    }
}

export default instance;

export { authService, clearToken, getErrorMessage };