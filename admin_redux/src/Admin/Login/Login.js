import './Login.css';
import { Form, Input, Button, Icon, notification } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from './LoginAPI';
import { ACCESS_TOKEN } from '../Common/Constant/common';

const FormItem = Form.Item;

class Login extends React.Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
            <br/><br/>
                <h1>ĐĂNG NHẬP</h1>
                <AntWrappedLoginForm onLogin={this.props.onLogin} />
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                        if (error.status === 401) {
                            notification.error({
                                message: 'Thông báo',
                                description: 'Tài khoản hoặc mật khẩu không chính xác, vui lòng nhập lại'
                            });
                        } else {
                            notification.error({
                                message: 'Thông báo',
                                description: error.message || 'Sorry! Something went wrong. Please try again!'
                            });
                        }
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Vui lòng nhập tài khoản hoặc email' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Đăng nhập</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Login;