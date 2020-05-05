import React, { Component } from "react";
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import Header from "./Admin/Common/Header/header";
import CreateShoe from './Admin/Shoe/create-shoe/create-shoe';
import EditShoe from './Admin/Shoe/edit-shoe/edit-shoe';
import ListShoe from './Admin/Shoe/list-shoe/list-shoe';
import BadRequest from './Admin/Common/BadRequest/bad-request';
import { getCurrentUser } from './Admin/Common/UserAPI/UserAPI';
import { ACCESS_TOKEN } from './Admin/Common/Constant/common';
import { notification } from 'antd';
import Login from './Admin/Login/Login';
import Invoice from './Admin/Invoice/Invoice';
import PrivateRoute from './PrivateRoute';
import LoadingIndicator from './Admin/Common/LoadingIndicator/LoadingIndicator';
import GoodsReceipt from './Admin/GoodsReceipt/GoodsReceipt';
import UploadImg from "./Admin/Shoe/upload-img/upload-img";
import StatisticsRevenue from "./Admin/Statistics/statistics-revenue";
import Signup from './Admin/Signup/Signup';
import NotFound from './Admin/Common/NotFound/NotFound';

notification.config({
  placement: 'topRight',
  duration: 3,
});

class App extends Component {
  state = {
    currentUser: null,
    isAuthenticated: false,
    isLoading: false
  }
  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleLogout = (redirectTo = "/", notificationType = "success", description = "Đăng xuất thành công") => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

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
    this.props.history.push("/");
  }

  componentWillMount() {
    this.loadCurrentUser();
  }

  render() {
    console.log(this.state.isAuthenticated)
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }

    return (
      <div>
        {this.state.isAuthenticated && <Header isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout} />}

        <div className="m-2">
          <Switch>
            <Route path="/login" render={(props) => this.state.isAuthenticated ?
              <StatisticsRevenue /> : <Login onLogin={this.handleLogin} {...props} />}></Route>
            <PrivateRoute path="/admin/dang-ky" component={Signup} authenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}></PrivateRoute>
            <PrivateRoute
              path="/admin/danh-sach-giay/them-giay"
              authenticated={this.state.isAuthenticated}
              component={CreateShoe}
              handleLogout={this.handleLogout}
            />
            <PrivateRoute
              path="/admin/danh-sach-giay/sua-giay"
              authenticated={this.state.isAuthenticated}
              component={EditShoe}
              handleLogout={this.handleLogout}
            />
            <PrivateRoute
              path="/admin/danh-sach-giay/anh-giay"
              authenticated={this.state.isAuthenticated}
              component={UploadImg}
              handleLogout={this.handleLogout}
            />
            <PrivateRoute path="/admin/danh-sach-giay" component={ListShoe} authenticated={this.state.isAuthenticated} handleLogout={this.handleLogout} />
            <PrivateRoute path="/admin/don-hang" component={Invoice} authenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}></PrivateRoute>
            <PrivateRoute path="/admin/nhap-hang" component={GoodsReceipt} authenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}></PrivateRoute>
            <PrivateRoute
              exact
              path={["/admin/trang-chu", "/"]}
              authenticated={this.state.isAuthenticated}
              component={StatisticsRevenue}
            />
            <Route component={NotFound} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default withRouter(App);
