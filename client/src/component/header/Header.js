import React, { Component } from 'react';
import './Header.css';
import SelectGiay from './SelectGiay';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../common/Constant/common';

class Header extends Component {

    state = {
        count: 0,
        isLogged: false,
    }

    async componentDidMount() {

        if (this.props.giay.listTenGiay.length === 0) {

            await this.getListTenGiay();
        }
    }

    componentWillMount() {
        var isLogged = false;
        if (localStorage.getItem(ACCESS_TOKEN)) {
            isLogged = true;
        } else
            isLogged = false;
        this.setState({ isLogged });
    }

    clickLogout = () => {
        this.props.onLogout();
        this.setState({ isLogged: false });
    }

    // lấy danh sách tên giày
    getListTenGiay() {
        fetch("/api/ten-giay")
            .then(res => res.json())
            .then(data => {
                this.props.getListTenGiay(data)
            }).catch(e => {
                console.log(e);
            });
    }

    handleChange = (value) => {
        if(value != null){
            this
            .props
            .history
            .push('/chi-tiet-giay/' + value);
        }
       
    }

    componentWillReceiveProps(props) {
        this.setState({ count: props.count });
    }

    // componentWillMount() {   
    //     const cart = JSON.parse(localStorage.getItem('items'));
    //     if (cart !== null) {
    //         this.setState({
    //             count: cart.length,
    //         })
    //     }
    // }

    render() {
        var { count, isLogged } = this.state;
        var { giay } = this.props;

        return (
            <React.Fragment>
                <header className="row align-items-center">
                    <div className="col-10">
                    <Link to="/"><img id="logo" src="/images/logo_retina.png" className="mr-3" alt="Không có hình ảnh" /></Link>
                        <SelectGiay listTenGiay={giay.listTenGiay} />
                    </div>
                    <div className="col-2 text-right">
                        <ul className="list-inline">
                            {
                                isLogged &&
                                <li className="list-inline-item">
                                    <a className="icon-size mr-4">
                                        <Link to="/thong-tin"><Icon type="user" /></Link></a>
                                </li>
                            }

                            <li className="list-inline-item">
                                <Badge count={count} className="mr-4">
                                    <a className="icon-size">
                                        <Link to="/gio-hang"><Icon type="shopping-cart" /></Link></a>
                                </Badge>
                            </li>
                            <li className="list-inline-item">
                                <Badge dot>
                                    <a className="icon-size" >
                                        {
                                            !isLogged &&
                                            <Link to='/dang-nhap' ><Icon type="login" /></Link>
                                        }

                                        {
                                            isLogged &&
                                            <Icon type="logout" onClick={this.clickLogout} />
                                        }
                                    </a>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return { giay: state.giay }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListTenGiay: (listTenGiay) => {
            dispatch(actions.list_ten_giay(listTenGiay));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);