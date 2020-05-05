
import { request } from '../../common/APIUtils';
import { API_BASE_URL } from '../../common/Constant/common';

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}