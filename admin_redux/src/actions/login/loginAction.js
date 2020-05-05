import {
    loginType
} from '../types';
export const loginUser = loginData => dispatch => {
    fetch("/authorized-login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }).then(res => res.json())
        .then(
            result => {
                dispatch({
                    type: loginType.LOGIN,
                    payload: result
                })
            },
            error => {
                console.log('Lỗi đăng nhập ' + error);
            }
        )
};