
import { request } from '../../common/APIUtils';
import { API_BASE_URL } from '../../common/Constant/common';
export function getShoe(id) {
    return request({
        url: API_BASE_URL +  "/client/public/payment/get-shoe?id=" + id,
        method: 'GET'
    });
}