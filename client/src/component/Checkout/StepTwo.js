import './Checkout.css';
import React, { Component } from 'react';
import { Collapse, Icon, Button, message } from 'antd';

const Panel = Collapse.Panel;
class StepTwo extends Component {
    state = {
        paymentMethod: 'cod',
    }

    handleChangePayment = (key) => {
        this.setState({
            paymentMethod: key,
        });
        console.log(key);
    }

    next = (e) => {
        const {paymentMethod} = this.state;
        if (paymentMethod != null)
            this.props.handlerNext(null, null, null, paymentMethod);
        else 
            message.error('Vui lòng chọn hình thức thanh toán');
    }

    render() {
        const method = this.state.paymentMethod;
        return (
            <div>
                <Collapse accordion defaultActiveKey={['cod']} onChange={this.handleChangePayment}>
                    <Panel className={method === 'creditcard' ? "selected-method" : null}
                        header={<div style={method === 'creditcard' ? { color: 'white' } : null}>Thanh toán qua thẻ tín dụng <Icon type="credit-card" theme="twoTone" /></div>} key="creditcard">

                    </Panel>
                    <Panel className={method === 'bank' ? "selected-method" : null}
                        header={<div style={method === 'bank' ? { color: 'white' } : null}>Thanh toán qua ngân hàng nội địa <Icon type="bank" theme="twoTone" /></div>} key="bank">

                    </Panel>
                    <Panel className={method === 'paypal' ? "selected-method" : null}
                        header={<div style={method === 'paypal' ? { color: 'white' } : null}>Thanh toán qua cổng thanh toán Paypal <Icon type="safety-certificate" theme="twoTone" /></div>} key="paypal">

                    </Panel>
                    <Panel className={method === 'cod' ? "selected-method" : null}
                        header={<div style={method === 'cod' ? { color: 'white' } : null}>Thanh toán khi nhận hàng <Icon type="dollar" theme="twoTone" /></div>} key="cod">
                        Bạn có thể kiểm tra và thanh toán khi nhận hàng.
                    </Panel>
                </Collapse>
                <br />
                <Button type="primary" onClick={this.next} className="float-right">Bước tiếp</Button>
            </div >
        );
    }
}

export default StepTwo;
