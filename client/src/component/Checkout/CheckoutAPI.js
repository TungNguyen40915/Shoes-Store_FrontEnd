
import { API_BASE_URL } from '../../common/Constant/common';
import { request } from '../../common/APIUtils';

export function pay(payment) {
    return request({
        url: API_BASE_URL + "/client/public/payment/pay",
        method: 'POST',
        body: JSON.stringify(payment)
    });
}