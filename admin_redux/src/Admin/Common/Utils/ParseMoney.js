const moneyUtil = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
    minimumFractionDigits: 0
})

export default moneyUtil;