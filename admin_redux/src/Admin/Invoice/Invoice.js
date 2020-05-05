import './Invoice.css';
import React, { Component } from 'react';
import matchSorter from "match-sorter";
import { Table, Modal, Button, notification, Card, Icon, Input, DatePicker, Select, Row, Col } from 'antd';
import { getOrderDetail, getStatus, updateStatus } from './InvoiceAPI';
import { database } from '../../firebase';

notification.config({
    placement: 'topRight',
    duration: 3,
});

const Option = Select.Option;

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            selectedOrder: Object,
            selectedStatus: { key: 1, label: '' },
            dataSourceOrders: null,
            dataSourceOrderDetail: null,
            listStatus: [],

            isLoading: false,
            visibleModalDetail: false,

            txtOrderId: '',
            txtOrderDate: '',
            txtCustomerName: '',
            txtCustomerPhone: '',
            txtStatus: 'Tất cả',
        };
    }

    showModal = (record) => {
        this.setState({
            visibleModalDetail: true,
            selectedOrder: record
        });
        this.loadOrderDetail(record.orderId);
    }

    handleOk = () => {
        this.setState({ visibleModalDetail: false });
    }

    handleCancel = () => {
        this.setState({ visibleModalDetail: false });
    }

    handleChangeStatus = (value, text) => {
        this.setState({
            selectedStatus: { key: value, label: text.props.children }
        });
    }

    emitEmptyOrderId = () => {
        this.txtOrderIdInput.focus();
        this.setState({ txtOrderId: '' });
        this.searchOrder(
            '',
            this.state.txtOrderDate,
            this.state.txtCustomerName,
            this.state.txtCustomerPhone,
            this.state.txtStatus
        );
    }

    onChangeTxtOrderId = (e) => {
        this.setState(
            {
                txtOrderId: e.target.value,
            }
        );
        this.searchOrder(
            e.target.value,
            this.state.txtOrderDate,
            this.state.txtCustomerName,
            this.state.txtCustomerPhone,
            this.state.txtStatus
        );
    }

    emitEmptyCustomerName = () => {
        this.txtCustomerNameInput.focus();
        this.setState({ txtCustomerName: '' });
        this.searchOrder(
            this.state.txtOrderId,
            this.state.txtOrderDate,
            '',
            this.state.txtCustomerPhone,
            this.state.txtStatus
        );
    }

    onChangeTxtCustomerName = (e) => {
        this.setState({
            txtCustomerName: e.target.value,
        });
        this.searchOrder(this.state.txtOrderId,
            this.state.txtOrderDate,
            e.target.value,
            this.state.txtCustomerPhone,
            this.state.txtStatus
        );
    }

    emitEmptyCustomerPhone = () => {
        this.txtCustomerPhoneInput.focus();
        this.setState({ txtCustomerPhone: '' });
        this.searchOrder(
            this.state.txtOrderId,
            this.state.txtOrderDate,
            this.state.txtCustomerName,
            '',
            this.state.txtStatus
        );
    }

    onChangeTxtCustomerPhone = (e) => {
        this.setState({
            txtCustomerPhone: e.target.value,
        });
        this.searchOrder(
            this.state.txtOrderId,
            this.state.txtOrderDate,
            this.state.txtCustomerName,
            e.target.value,
            this.state.txtStatus
        );
    }

    onChangeOrderDate = (date, dateString) => {
        this.setState({
            txtOrderDate: dateString,
        });
        this.searchOrder(
            this.state.txtOrderId,
            dateString,
            this.state.txtCustomerName,
            this.state.txtCustomerPhone,
            this.state.txtStatus);
    }

    handleStatusChange = (value) => {
        this.setState({
            txtStatus: value
        })
        this.searchOrder(
            this.state.txtOrderId,
            this.state.txtOrderDate,
            this.state.txtCustomerName,
            this.state.txtCustomerPhone,
            value
        );
    }

    handleUpdateStatus = () => {
        this.updateStatus();
    }

    searchOrder(orderId, orderDate, customerName, customerPhone, status) {
        console.log(orderId, orderDate, customerName, customerPhone, status);
        var filted;
        if (orderId.trim() !== '') {
            filted = matchSorter(this.state.dataSourceOrders, orderId.trim(), {
                keys: ["orderId"]
            })
        } else
            filted = this.state.dataSourceOrders

        if (orderDate.trim() !== '') {
            filted = matchSorter(filted, orderDate.trim(), {
                keys: ["orderDate"]
            })
        }

        if (customerName.trim() !== '') {
            filted = matchSorter(filted, customerName.trim(), {
                keys: ["customerName"]
            })
        }

        if (customerPhone.trim() !== '') {
            filted = matchSorter(filted, customerPhone.trim(), {
                keys: ["customerPhone"]
            })
        }

        if (status.trim() !== 'Tất cả') {
            filted = matchSorter(filted, status.trim(), {
                keys: ["status"]
            })
        }

        this.setState({
            filter: filted,
        });
    }

    loadOrderDetail(orderId) {
        this.setState({
            dataSourceOrderDetail: [],
            isLoading: true
        });
        getOrderDetail(orderId)
            .then(response => {
                console.log(response);
                this.setState({
                    dataSourceOrderDetail: response,
                    isLoading: false
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    loadStatus() {
        getStatus()
            .then(response => {
                console.log(response);
                const items = [];
                response.forEach(function (status) {
                    items.push(<Option key={status.idTinhTrang}>{status.tenTinhTrang}</Option>);
                });
                this.setState({
                    listStatus: items,
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                    });
                } else {
                    this.setState({
                        serverError: true,
                    });
                }
            });
    }

    updateStatus() {
        const id = this.state.selectedOrder.orderId;
        const stt = this.state.selectedStatus.key;
        updateStatus(id, stt.key)
            .then(response => {
                notification.success({
                    message: 'Thông báo',
                    description: "Cập nhập tình trạng đơn hàng  #" + id + "=> " + stt.label,
                });
            }).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'You have been logged out. Please login');
                } else {
                    notification.error({
                        message: 'Thông báo',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                }
            });
        const strStatus = this.state.selectedStatus.label;
        var key;
        var _order;
        database.ref("/orders").once('value', (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var order = childSnapshot.val();
                if (order.orderId === id) {
                    order.status = strStatus;
                    key = childSnapshot.key;
                    _order = order;
                    return;
                }
            })
        });
        _order.status = strStatus;
        database.ref("/orders/" + key).update({
            'customerName': _order.customerName,
            'customerPhone': _order.customerPhone,
            'orderDate': _order.orderDate,
            'orderId': _order.orderId,
            'status': _order.status,
            'summary': _order.summary,
        }, function (error) {
            if (error) {
                // The write failed...
            } else {
                // Data saved successfully!
            }
        });

        const _selectedOrder = this.state.selectedOrder;
        _selectedOrder.status = strStatus;
        this.setState({
            selectedOrder: _selectedOrder
        });
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });
        database.ref("/orders").orderByKey().limitToLast(1).on('child_added', function (snapshot) {
            var newOrder = snapshot.val();
            if (newOrder.status === 'Mới nhận') {
                notification.success({
                    message: 'Thông báo',
                    description: "Bạn có đơn hàng mới chưa xủ lý",
                });
            }
        });
        database.ref("/orders").on('value', (snapshot) => {
            var orders = [];
            snapshot.forEach(function (childSnapshot) {
                var value = childSnapshot.val();
                orders.push(value);
            })
            this.setState({
                dataSourceOrders: orders,
                filter: orders,
                isLoading: false,
            });
        });
        this.loadStatus();
    }

    render() {
        const columnsTableOrder = [
            { title: 'Mã', dataIndex: 'orderId', key: 'orderId', },
            { title: 'Ngày', dataIndex: 'orderDate', key: 'orderDate' },
            { title: 'Tên', dataIndex: 'customerName', key: 'customerName' },
            { title: 'Số điện thoại', dataIndex: 'customerPhone', key: 'customerPhone' },
            { title: 'Tổng tiền', dataIndex: 'summary', key: 'summary' },
            { title: 'Tình trạng', dataIndex: 'status', key: 'status' },
            {
                title: '', dataIndex: 'x', key: '',
                render: (text, record) =>
                    <Button icon="search" onClick={() => this.showModal(record)}>Xem chi tiết</Button>
            }
        ];
        const columnsTableOrderDetail = [
            { title: 'Mã sản phẩm', dataIndex: 'chiTietGiay.giay.idGiay', key: 'chiTietGiay.giay.idGiay' },
            { title: 'Tên sản phẩm', dataIndex: 'chiTietGiay.giay.tenGiay', key: 'chiTietGiay.giay.tenGiay' },
            { title: 'Đơn giá', dataIndex: 'chiTietGiay.giay.giaBan', key: 'chiTietGiay.giay.giaBan' },
            { title: 'Số lượng', dataIndex: 'soLuong', key: 'soLuong' },
            { title: 'Thành tiền', dataIndex: 'thanhTien', key: 'thanhTien' },
        ];
        const selectedOrder = this.state.selectedOrder

        const { txtOrderId, txtCustomerName, txtCustomerPhone } = this.state;
        const suffixOrderId = txtOrderId ? <Icon type="close-circle" onClick={this.emitEmptyOrderId} /> : null;
        const suffixCustomerName = txtCustomerName ? <Icon type="close-circle" onClick={this.emitEmptyCustomerName} /> : null;
        const suffixCustomerPhone = txtCustomerPhone ? <Icon type="close-circle" onClick={this.emitEmptyCustomerPhone} /> : null;

        return (
            <div style={{ padding: '30px' }}>
                <Card title="Tìm kiếm đơn hàng" bordered={false} style={{ width: '100%' }}>
                    <Row gutter={16}>
                        <Col span={5}>
                            <Input
                                placeholder="Mã hoá đơn"
                                prefix={<Icon type="qrcode" />}
                                suffix={suffixOrderId}
                                value={txtOrderId}
                                onChange={this.onChangeTxtOrderId}
                                ref={node => this.txtOrderIdInput = node}
                            />
                        </Col>
                        <Col span={5}>
                            <DatePicker format="DD-MM-YYYY" onChange={this.onChangeOrderDate} placeholder="Ngày mua hàng" style={{ width: '100%' }} />
                        </Col>
                        <Col span={5}>
                            <Input
                                placeholder="Tên khách hàng"
                                prefix={<Icon type="user" />}
                                suffix={suffixCustomerName}
                                value={txtCustomerName}
                                onChange={this.onChangeTxtCustomerName}
                                ref={node => this.txtCustomerNameInput = node}
                            />
                        </Col>
                        <Col span={5}>
                            <Input
                                placeholder="Số điện thoại"
                                prefix={<Icon type="phone" />}
                                suffix={suffixCustomerPhone}
                                value={txtCustomerPhone}
                                onChange={this.onChangeTxtCustomerPhone}
                                ref={node => this.txtCustomerPhoneInput = node}
                            />
                        </Col>
                        <Col span={4}>
                            <Select defaultValue="Tất cả" style={{ width: '100%' }} onChange={this.handleStatusChange}>
                                <Option value="Tất cả"><Icon type="bars" /> Tất cả</Option>
                                <Option value="Mới nhận"><Icon type="shopping-cart" /> Mới nhận</Option>
                                <Option value="Đang giao hàng"><Icon type="car" /> Đang giao hàng</Option>
                                <Option value="Hoàn thành"><Icon type="smile" /> Hoàn thành</Option>
                                <Option value="Huỷ"><Icon type="frown" /> Huỷ</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>

                <Table
                    columns={columnsTableOrder}
                    locale={{ emptyText: "Đang lấy dữ liệu" }}
                    rowKey='orderId'
                    dataSource={this.state.filter}
                    loading={this.state.isLoading}
                />

                <Modal
                    title={'Thông tin đơn hàng #' + selectedOrder.orderId}
                    width={1000}
                    visible={this.state.visibleModalDetail}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Select key="status" style={{ width: 200 }} labelInValue defaultValue={{ key: '1' }} onChange={this.handleChangeStatus}>
                            {this.state.listStatus}
                        </Select>,

                        <Button key="update" type="primary" onClick={this.handleUpdateStatus} >Cập nhập</Button>,

                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Đóng
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={12}>
                            <table style={{ 'width': '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>Tên khách hàng:</td>
                                        <td>{selectedOrder.customerName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{selectedOrder.customerEmail}</td>
                                    </tr>
                                    <tr>
                                        <td>Số điện thoại:</td>
                                        <td>{selectedOrder.customerPhone}</td>
                                    </tr>
                                    <tr>
                                        <td>Điạ chỉ:</td>
                                        <td>
                                            {selectedOrder.customerAddress}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col span={12}>
                            <table style={{ 'width': '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>Trạng thái:</td>
                                        <td>{selectedOrder.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày mua:</td>
                                        <td>{selectedOrder.orderDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Phương thức thanh toán</td>
                                        <td>{
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
                                            }</td>
                                    </tr>
                                    <tr>
                                        <td>Phương thức vận chuyển:</td>
                                        <td>
                                            {selectedOrder.shipMethod === 'default' && 'Mặc định'}
                                            {selectedOrder.shipMethod === 'normal' && 'Tiêu chuẩn'}
                                            {selectedOrder.shipMethod === 'fast' && 'Nhanh'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <br />
                    <Table rowKey='idChiTietDonHang'
                        locale={{ emptyText: "Chưa có dữ liệu" }}
                        dataSource={this.state.dataSourceOrderDetail}
                        columns={columnsTableOrderDetail}
                    />
                </Modal>
            </div>
        );
    }
}



export default Invoice;
