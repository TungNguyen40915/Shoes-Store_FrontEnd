import {
    getGiayById
} from '../types';
import { request } from './../../Admin/Common/APIUtils';

export const GetGiayById = idGiayData => dispatch => {
    request({
        url: "/admin/api/shoe/get-giay-by-id",
        method: "POST",
        body: JSON.stringify(idGiayData)
    })
        .then(
            result => {

                dispatch({
                    type: getGiayById.GET_GIAY_BY_ID,
                    payload: result
                })
            },
            error => {
                console.log('Lỗi không get giay từ id ' + error);
            }
        )
};

export const getImageByIdGiay = idGiay => dispatch => {
    request({
        url: "/admin/api/shoe/get-img-by-id",
        method: "POST",
        body: JSON.stringify(idGiay),
    })
        .then(
            result => {
                dispatch({
                    type: getGiayById.GET_IMAGE_GIAY,
                    payload: result
                })
            },
            error => {
                console.log("Lỗi get image " + error);
            }
        );
};