import { VITE_APP_API_URL } from '@/config.js';
import { useAuthStore } from '@/store/Auth.js';
import { useAlertStore } from '@/store/Alert.js';
//get all tags data
export async function get() {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/tags', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, true))
        .catch((error) => errorHappen(error));
}

//create a tag with data
export async function create(data) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/tags', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + authStore.token },
        body: JSON.stringify(data),
    })
        .then((response) => handleErrors(response, false))
        .catch(errorHappen);
}

//get a tag by id
export async function getById(id) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/tags/' + id, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, true))
        .catch((error) => errorHappen(error));
}

//delete a tag by id
export async function deleteById(id) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/tags/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + authStore.token },
    })
        .then((response) => handleErrors(response, false))
        .catch((error) => errorHappen(error));
}

//usually is for verify tag
export async function updateById(id, data) {
    const authStore = useAuthStore();
    return await fetch(VITE_APP_API_URL + '/tags/' + id, {
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
function errorHappen() {
    const alertStore = useAlertStore();
    alertStore.callAlert('發生錯誤', 'error');
    return false;
}
