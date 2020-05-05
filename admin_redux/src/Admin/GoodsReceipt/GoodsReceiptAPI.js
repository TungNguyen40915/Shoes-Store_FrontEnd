import { request } from '../Common/APIUtils';
import { API_BASE_URL } from '../Common/Constant/common';

const PAGE_URL = '/phieu-nhap';

export function getBrands() {
    return request({
        url: API_BASE_URL + PAGE_URL + "/get-hang-san-xuat",
        method: 'POST'
    });
}

export function getShoes() {
    return request({
        url: "/admin/api/shoe/list-shoe",
        method: 'POST'
    });
}

export function save(reciept) {
    return request({
        url: API_BASE_URL +  PAGE_URL + "/luu",
        method: 'POST',
        body: JSON.stringify(reciept)
    });
}