import { request } from '../Common/APIUtils';
import { API_BASE_URL } from '../Common/Constant/common';

const PAGE_URL = '/invoice';
export function getOrderDetail(id) {
    return request({
        url: API_BASE_URL + PAGE_URL + "/get-order-detail?id=" + id,
        method: 'POST'
    });
}

export function getStatus() {
    return request({
        url: API_BASE_URL + PAGE_URL + "/get-status",
        method: 'POST'
    });
}

export function updateStatus(id, stt) {
    return request({
        url: API_BASE_URL + PAGE_URL + "/update-status?id=" + id + "&stt=" + stt,
        method: 'POST'
    });
}