import { Form, Input, Tooltip, Icon, Select, Button, Row, Col, message } from 'antd';
import React, { Component } from 'react';

class Info extends Component {
    render() {
        const Form1 = Form.create()(InfoForm);
        const Form2 = Form.create()(PasswordForm);
        return (
            <Row>
                <Col lg={12}>
                    <Form1 loggedUser={this.props.loggedUser} />
                </Col>
                <Col lg={12}>
                    <Form2 loggedUser={this.props.loggedUser} />
                </Col>
            </Row >
        );
    }
}

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class InfoForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSaveInfo(form) {

        const frm = {
            diaChi: form.diaChi,
            soDienThoai: form.soDienThoai,
            tenKhachHang: form.tenKhachHang,
            id: this.props.loggedUser.user.userId
        }
        fetch("/api/khach-hang/update-info", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(frm)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    message.success('Cập nhật thông tin thành công')
                } else {
                    message.error('Cập nhật thông tin thất bại')
                }
            }).catch(e => {
                console.log(e);
            });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.handleSaveInfo(values)
            } else {
               
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 18,
                    offset: 0,
                },
                sm: {
                    span: 9,
                    offset: 15,
                },
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
                <FormItem
                    {...formItemLayout}
                    label="Họ tên"
                >
                    {getFieldDecorator('tenKhachHang', {
                        initialValue: this.props.loggedUser.tenKhachHang,
                        rules: [
                            { required: true, message: 'Họ và tên không được trống' },
                            { max: 100, message: "Số kí tự tối đa là 100!" }
                        ],
                    })(
                        <Input style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Số điện thoại"
                >
                    {getFieldDecorator('soDienThoai', {
                        initialValue: this.props.loggedUser.soDienThoai,
                        rules: [
                            { required: true, message: 'Số điện thoại không được trống' },
                            { max: 10, message: "Số kí tự tối đa là 10!" }
                        ],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Địa chỉ"
                >
                    {getFieldDecorator('diaChi', {
                        initialValue: this.props.loggedUser.diaChi,
                        rules: [{ required: true, message: 'Địa chỉ không được trống' },
                        { max: 500, message: "Số kí tự tối đa là 500!" }],
                    })(
                        <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>

                    <Button type="primary" htmlType="submit">Lưu</Button>
                </FormItem>
            </Form>
        );
    }
}

class PasswordForm extends Component {


    handleSavePwd(form) {

        const frm = {
            oldPwd: form.oldPwd,
            newPwd: form.newPwd,
            id: this.props.loggedUser.user.userId
        }
        console.log(frm)
        fetch("/api/khach-hang/update-password", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(frm)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    message.success('Thay đổi mật khẩu thành công!')
                } else if (data.status === 'wrong') {
                    message.error('Mật khẩu cũ không chính xác')
                } else {

                }
            }).catch(e => {
                console.log(e);
            });
    }

    handlePassword = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.handleSavePwd(values);
            } else {

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.loggedUser)
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 18,
                    offset: 0,
                },
                sm: {
                    span: 9,
                    offset: 15,
                },
            },
        };
        return (
            <Form onSubmit={this.handlePassword}>
                <FormItem
                    {...formItemLayout}
                    label="Mật khẩu cũ"
                >
                    {getFieldDecorator('oldPwd', {
                        rules: [{
                            required: true, message: 'Mật khẩu cũ không được rỗng',
                        }, {
                            max: 45, message: 'Số kí tự tối đa là 45!'
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Mật khẩu mới"
                >
                    {getFieldDecorator('newPwd', {
                        rules: [{
                            required: true, message: 'Mật khẩu mới không được rỗng',

                        }, {
                            max: 45, message: 'Số kí tự tối đa là 45!'
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </FormItem>
            </Form>
        );
    }

};

export default Info;
