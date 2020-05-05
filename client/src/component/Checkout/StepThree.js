import './Checkout.css';
import React, { Component } from 'react';
import { Row, Col, Divider, Icon } from 'antd';
import moneyUtil from '../../common/Utils/ParseMoney';

class StepThree extends Component {
    state = {

    }

    render() {
        const { customer, total, discount, summary, shipMethod, paymentMethod } = this.props;
        const layout = {
            paymentZone: { xs: 24, sm: 16, md: 16, lg: 16 },
            cartZone: { xs: 24, sm: 8, md: 8, lg: 8 },
        }
        return (
            <div>
                <Row>
                    <Col xs={24} sm={8} md={8} lg={8}>
                        <b>Thông tin người mua: </b>
                        <br /> <br />
                        <p>{customer.email}</p>
                        <p>{customer.name}</p>
                        <p>{customer.prefix + customer.phone}</p>
                        <p>{customer.address}</p>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8}>
                        <b>Phương thức thanh toán: </b> <br /> <br />
                        {paymentMethod === 'creditcard' && <div> <Icon type="credit-card" theme="twoTone" /> Thanh toán qua thẻ tín dụng.</div>}
                        {paymentMethod === 'bank' && <div> <Icon type="bank" theme="twoTone" /> Thanh toán qua ngân hàng nội địa.</div>}
                        {paymentMethod === 'paypal' && <div> <Icon type="safety-certificate" theme="twoTone" /> Thanh toán qua cổng thanh toán Paypal.</div>}
                        {paymentMethod === 'cod' && <div> <Icon type="dollar" theme="twoTone" /> Thanh toán khi nhận hàng.</div>} <br />
                        <b>Chế độ giao hàng: </b> <br /> <br />
                        {shipMethod === 'default' && <div><Icon type="car" theme="twoTone" /> Mặc định</div>}
                        {shipMethod === 'normal' && <div><Icon type="car" theme="twoTone" /> Tiêu chuẩn</div>}
                        {shipMethod === 'fast' && <div><Icon type="car" theme="twoTone" /> Nhanh</div>}
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8}>
                        <b>Chi tiết mua hàng </b><br /> <br />
                        <Row>
                            <Col span={12}>Tổng cộng:</Col>
                            <Col span={12}>{moneyUtil.format(summary)}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Giảm giá:</Col>
                            <Col span={12}>{discount}%</Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={12}>Thành tiền:</Col>
                            <Col span={12}>{moneyUtil.format(summary)}</Col>
                        </Row>
                    </Col>
                </Row>
                <br />
            </div >
        );
    }
}

export default StepThree;
