import * as types from '../constants/ActionTypes';

var initialState = {
    listTenGiay: [],
    listGiayNoiBac: [],
    listGiayBanChay: [],
    listLoaiGiay: []
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_TEN_GIAY:
            {
                // var listTenGiay = state.listTenGiay; action.listTenGiay.forEach(tenGiay => {
                //  listTenGiay.push(tenGiay); }); var newState = {     ...state, listTenGiay:
                // listTenGiay }
                return {
                    ...state,
                    listTenGiay: action.listTenGiay
                };
            }
        case types.LIST_GIAY_NOI_BAC:
            {
                return {
                    ...state,
                    listGiayNoiBac: action.listGiayNoiBac
                }
            }
        case types.LIST_GIAY_BAN_CHAY:
            {
                return {
                    ...state,
                    listGiayBanChay: action.listGiayBanChay
                }
            }

        case types.LIST_LOAI_GIAY:
            {
                return {
                    ...state,
                    listLoaiGiay: action.listLoaiGiay
                }
            }
        default:
            return state;
    }
};

export default myReducer;