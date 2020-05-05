import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './component/home/Home';
import ShoeDetail from './component/shoe-detail/ShoeDetail';
import Footer from './component/footer/footer';

import { BackTop, Affix, notification } from 'antd';
import './App.css';
import Profile from './component/profile/Profile';
import Signup from './component/Signup/Signup';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import Header from './component/header/Header';
import Menu from './component/menu/Menu';
import { getCurrentUser } from './common/UserAPI/UserAPI';
import { ACCESS_TOKEN } from './common/Constant/common';
import LoadingIndicator from './component/LoadingIndicator/LoadingIndicator';
import Login from './component/Login/Login';
import PrivateRoute from './PrivateRoute';
import ListShoe from './component/list-shoe/ListShoe';

class App extends Component {
    state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
        count: 0,
    }

    loadCurrentUser = () => {

        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response));
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    handleLogout = (redirectTo = "/", notificationType = "success", description = "Đăng xuất thành công") => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem('loggedUser');
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        // this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Thông báo',
            description: description,
        });
    }

    handleLogin = () => {
        notification.success({
            message: 'Thông báo',
            description: "Đăng nhập thành công.",
        });
        this.loadCurrentUser();
    }

    handleUpdateCart = () => {
        const cart = JSON.parse(localStorage.getItem('items'));
        if (cart !== null) {
            this.setState({
                count: cart.length,
            })
        }
    }
    handleClearCart = () => {
        this.setState({
            count: 0,
        })
    }

    componentWillMount() {
        this.loadCurrentUser();
        this.handleUpdateCart();
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator />
        }
        console.log(this.state.isAuthenticated)
        return (
            <React.Fragment>
                <BackTop />
                <div className="container-fluid">
                    <Header handleUpdateCart={this.handleUpdateCart} onLogout={this.handleLogout} count={this.state.count} />
                    <Affix offsetTop={0}>
                        <Menu />
                    </Affix>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path="/chi-tiet-giay/:id" render={(props) => <ShoeDetail handleUpdateCart={this.handleUpdateCart} {...props} />}></Route>
                        <PrivateRoute path='/thong-tin' isAuthenticated={this.state.isAuthenticated}
                            onLogout={this.handleLogout} component={Profile} />
                        <Route path="/dang-nhap" render={(props) => this.state.isAuthenticated ?
                            <Profile /> : <Login onLogin={this.handleLogin} {...props} />}></Route>
                        <Route path="/dang-ky" component={Signup} />
                        <Route path="/gio-hang" render={(props) => <Cart handleUpdateCart={this.handleUpdateCart} {...props} />}></Route>
                        <Route path="/thanh-toan" render={(props) => <Checkout handleClearCart={this.handleClearCart} handleUpdateCart={this.handleUpdateCart} {...props} />}></Route>
                        <Route path='/danh-sach/:id' component={ListShoe} />
                    </Switch>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
