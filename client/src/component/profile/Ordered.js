import { Table, Button, Modal, Row, Col, Icon } from 'antd';
import React, { Component } from 'react';
import { database } from '../../firebase';

class Order extends Component {
    state = {
        visible: false,
        isLoading: true,
        dataSourceOrders: [],
        dataSourceShoes: [],
        selectedOrder: null,
    }

    viewDetail = (record) => {
        var dataSourceShoes = this.state.dataSourceShoes;
        dataSourceShoes = [];
        record.products.forEach(product => {
            dataSourceShoes.push(product);
        });
        this.setState({
            selectedOrder: record,
            dataSourceShoes,
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    componentDidMount() {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        var idKhachHang;
        if (loggedUser !== null) {
            idKhachHang =  loggedUser.idKhachHang;
        }
        database.ref("/orders").once('value', (snapshot) => {
            var orders = [];
            snapshot.forEach(function (childSnapshot) {
                var value = childSnapshot.val();
                if (value.idCustomer === idKhachHang) {
                    orders.push(value);
                }
            })
            this.setState({
                dataSourceOrders: orders,
                isLoading: false,
            });
        });
    }

    render() {
        const columns = [{
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
        }, {
            title: 'Ngày',
            dataIndex: 'orderDate',
            key: 'orderDate',
        }, {
            title: 'Tổng tiền',
            dataIndex: 'summary',
            key: 'summary',
        }, {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={() => this.viewDetail(record)}> Xem </Button>
            ),
        }];

        const columnShoes = [{
            title: 'Mã giày',
            dataIndex: 'shoeId',
            key: 'shoeId',
        }, {
            title: 'Tên giày',
            dataIndex: 'shoeName',
            key: 'shoeName',
        }, {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        }, {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: 'Thành tiền',
            dataIndex: 'sum',
            key: 'sum',
        }];

        const { dataSourceOrders, dataSourceShoes, selectedOrder, isLoading } = this.state;
        return (
            <div >
                <Table loading={isLoading} rowKey="orderId" columns={columns} dataSource={dataSourceOrders} />

                {
                    selectedOrder !== null &&
                    <Modal
                        width = '600px'
                        title={"Thông tin đơn hàng #" + selectedOrder.orderId}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Đóng</Button>,
                        ]}
                    >
                        <Row>
                            <Col span={12}>Tên khách hàng</Col>
                            <Col span={12}>{selectedOrder.customerName}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Địa chỉ email</Col>
                            <Col span={12}>{selectedOrder.customerEmail}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Số điện thoại</Col>
                            <Col span={12}>{selectedOrder.customerPhone}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Địa chỉ</Col>
                            <Col span={12}>{selectedOrder.customerAddress}</Col>
                        </Row>
                        <Row>
                            <Col span={12}>Phương thích thanh toán</Col>
                            <Col span={12}>
                                {
                                    selectedOrder.paymentMethod === 'creditcard' &&
                                    <div>Thanh toán qua thẻ tín dụng <Icon type="credit-card" theme="twoTone" /></div>
                                }
                                {
                                    selectedOrder.paymentMethod === 'bank' &&
                                    <div>Thanh toán qua ngân hàng nội địa <Icon type="bank" theme="twoTone" /></div>
                                }
                                {
                                    selectedOrder.paymentMethod === 'paypal' &&
                                    <div>Thanh toán qua cổng thanh toán Paypal <Icon type="safety-certificate" theme="twoTone" /></div>
                                }
                                {
                                    selectedOrder.paymentMethod === 'cod' &&
                                    <div>Thanh toán khi nhận hàng <Icon type="dollar" theme="twoTone" /></div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>Phương thức vận chuyển</Col>
                            <Col span={12}>
                                {selectedOrder.shipMethod === 'default' && 'Mặc định'}
                                {selectedOrder.shipMethod === 'normal' && 'Tiêu chuẩn'}
                                {selectedOrder.shipMethod === 'fast' && 'Nhanh'}
                            </Col>
                        </Row>
                        <br/>
                        <Table rowKey="shoeId" columns={columnShoes} dataSource={dataSourceShoes} />
                    </Modal>
                }
            </div>
        );
    }
}

export default Order;
