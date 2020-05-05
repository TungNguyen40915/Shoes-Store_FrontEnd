import './Checkout.css';
import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Button, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddressForm extends Component {
    state = {
        customer: {
            email: '',
            name: '',
            phone: '',
            address: '',
        },
        loggedCustomer: null,
        shipMethod: 'normal',
        isValid: false
    };

    onChangeShipMethod = (e) => {
        this.setState({
            shipMethod: e.target.value,
        });
    }

    next = (e) => {
        e.preventDefault();
        const shipMethod = this.state.shipMethod;
        this.props.form.validateFields((err, values) => {
            if (err) {
                this.setState({ customer: values, isValid: false })
                this.props.handlerNext(values, false, shipMethod);
            } else {
                this.setState({ customer: values, isValid: true })
                this.props.handlerNext(values, true, shipMethod);
            }
        });
    }

    setFormAddress(customer) {
        this.props.form.setFieldsValue({
            'email': customer.email,
            'name': customer.name,
            'phone': customer.phone,
            'address': customer.address
        });
    }

    componentWillMount() {
        const { customer } = this.props;
        if (customer !== null) {
            this.setFormAddress(customer);
        }

        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser !== null && loggedUser.idKhachHang !== 0) {
            console.log(loggedUser);
            const customer = {
                email: loggedUser.user.email,
                name: loggedUser.tenKhachHang,
                phone: loggedUser.soDienThoai,
                address: loggedUser.diaChi,
            };
            this.setState({ loggedCustomer: customer });
        }
    }

    render() {
        const { shipMethod, loggedCustomer } = this.state;
        const { selectedShipMethod } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                {
                    loggedCustomer !== null &&
                    <FormItem
                        {...formItemLayout}
                        label="Sử dụng địa chỉ đã lưu"
                    >
                        <Button block onClick={() => this.setFormAddress(loggedCustomer)}>
                            {loggedCustomer.name}, &nbsp; {loggedCustomer.email}, &nbsp;{loggedCustomer.address}, &nbsp;{loggedCustomer.phone}
                        </Button>
                    </FormItem>
                }
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Email&nbsp;
                <Tooltip title="Chúng tôi sẽ gửi thông tin đơn hàng, thông tin khuyến mãi và các chương trình ưu đãi cho khách hàng">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'Email không hợp lệ!',
                        }, {
                            required: true, message: 'Email không được trống!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Tên khách hàng"
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Tên không được trống!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: 'Số điện thoại không được trống!',
                        }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Địa chỉ">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Địa chỉ không được trống!', whitespace: true }],
                    })(
                        <TextArea placeholder="Địa chỉ nhận hàng" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>

                <div style={{ textAlign: 'center' }}>
                    <h5>Chọn hình thức giao hàng</h5>
                    <Radio.Group onChange={this.onChangeShipMethod} defaultValue={selectedShipMethod} buttonStyle="solid">
                        <Radio.Button value="default">Mặc định</Radio.Button>
                        <Radio.Button value="normal">Tiêu chuẩn</Radio.Button>
                        <Radio.Button value="fast">Nhanh</Radio.Button>
                    </Radio.Group>
                    <br />
                    {shipMethod === 'default' &&
                        <p>Hình thức giao hàng mặc định ..... </p>
                    }
                    {shipMethod === 'normal' &&
                        <p>Hình thức giao hàng tiêu chuẩn ..... </p>
                    }
                    {shipMethod === 'fast' &&
                        <p>Hình thức giao hàng nhanh ..... </p>
                    }
                </div>
                <Button type="primary" onClick={this.next} className="float-right">Bước tiếp</Button>
            </Form>
        );
    }
}

const StepOne = Form.create()(AddressForm);
export default StepOne;

