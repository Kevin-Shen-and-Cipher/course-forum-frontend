import { VITE_APP_API_URL } from '@/config.js';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';

//get all posts data
export async function get() {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/posts', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, true))
        .catch((error) => errorHappen(error));
}

//create a post with data
export async function create(data) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/posts', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + authStore.token },
        body: JSON.stringify(data),
    })
        .then((response) => handleErrors(response, false))
        .catch(errorHappen);
}

//get a post by id
export async function getById(id) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/posts/' + id, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, true))
        .catch((error) => errorHappen(error));
}

//delete a post by id
export async function deleteById(id) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/posts/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, false))
        .catch((error) => errorHappen(error));
}

//usually is for verify post
export async function updateById(id, data) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/posts/' + id, {
        method: 'PATCH',
        headers: { Authorization: 'Bearer ' + authStore.token },
        body: JSON.stringify(data),
    })
        .then((response) => handleErrors(response, false))
        .catch((error) => errorHappen(error));
}

//judge reponse.ok status to throw a new error
function handleErrors(response, returnJson) {
    if (!response.ok) throw new Error(response.status);
    if (returnJson) {
        return response.json();
    }
    return true;
}

//call alert popout element
function errorHappen(error) {
    const alertStore = useAlertStore();
    const authStore = useAuthStore();
    if (error === 401){
        alertStore.callAlert('認證缺失', 'error');
        authStore.removeAuth();
    }else if(error === 403){
        alertStore.callAlert('認證失敗', 'error');
        authStore.removeAuth();
    }
    alertStore.callAlert('發生錯誤 請檢查控制台', 'error');
    return false;
}
