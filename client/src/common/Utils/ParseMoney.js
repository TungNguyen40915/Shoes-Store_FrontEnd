const moneyUtil = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0
})

export default moneyUtil;