
import { API_BASE_URL } from './../Constant/common';
import { request } from './../APIUtils';

export function getCurrentUser() {
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}