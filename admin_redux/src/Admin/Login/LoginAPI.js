import { API_BASE_URL } from '../Common/Constant/common';
import { request } from '../Common/APIUtils';

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}