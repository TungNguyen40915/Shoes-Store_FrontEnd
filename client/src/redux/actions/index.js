import * as types from '../constants/ActionTypes';

export const list_ten_giay = (listTenGiay) => {
    return {
        type: types.LIST_TEN_GIAY,
        listTenGiay
    }
};

export const list_giay_noi_bac = (listGiayNoiBac) => {
    return {
        type: types.LIST_GIAY_NOI_BAC,
        listGiayNoiBac
    }
}

export const list_giay_ban_chay = (listGiayBanChay) => {
    return {
        type: types.LIST_GIAY_BAN_CHAY,
        listGiayBanChay
    }
}

export const list_loai_giay = (listLoaiGiay) => {
    return {
        type: types.LIST_LOAI_GIAY,
        listLoaiGiay
    }
}