import React, { Component } from 'react';
import * as Recharts from 'recharts';
import './style.css';
import "../Common/Loader/loader.css";
import { Row, Col, DatePicker, Select } from 'antd';
import request from '../Common/APIUtils';
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } = Recharts;
const { MonthPicker } = DatePicker;
const monthFormat = 'MM/YYYY';

const { Option } = Select;
class StatisticsRevenue extends Component {

    state = {
        dataLine: null,
        dataBar: null,
        thangs: null,
        soDonhang: 0,
        doanhThu: 0,
        year: null,
        monthYear: null,
        soLuongGiayBan: 0
    }
    onChangeBar = (date, dateString) => {
        console.log(dateString);
        if (dateString) {
            this.getDoanhThuHSX(dateString)
        }
    }
    onChangeLine = (value) => {
        console.log(value);
        if (value) {
            this.getTongDoanhThu(value);
        }
    }
    componentWillMount() {
        this.getDonHang();
        this.getDoanhThu();
        this.getThangTrongDonHang();
        this.getTongDoanhThu((new Date()).getFullYear());
        let d = new Date();
        this.getDoanhThuHSX(d.getMonth() + 1 + "/" + d.getFullYear());
        this.getSoLuongGiayBan();
    }
    getDonHang = () => {
        request({
            url: "/admin/api/thong-ke/get-so-don-hang",
            method: "POST",
            body: ''
        })
            .then(
                result => {
                    this.setState({
                        soDonhang: result
                    })
                },
                error => {
                    console.log("Lỗi đăng nhập " + error);
                }
            );
    }
    getDoanhThu = () => {
        request({
            url: "/admin/api/thong-ke/get-doanh-thu",
            method: "POST",
            body: ''
        })
            .then(
                result => {
                    console.log(result)
                    const num = result.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " USD";
                    this.setState({
                        doanhThu: num
                    })
                },
                error => {
                    console.log("Lỗi get doanh thu " + error);
                }
            ).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                }
            });;
    }
    getTongDoanhThu = (year) => {
        request({
            url: "/admin/api/thong-ke/get-tong-doanh-thu",
            method: "POST",
            body: JSON.stringify(year)
        })
            .then(
                result => {
                    this.setState({
                        dataLine: result,
                        year: year
                    })
                },
                error => {
                    console.log("Lỗi get tong doanh thu " + error);
                }
            ).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                }
            });;
    }
    getThangTrongDonHang = () => {
        request({
            url: "/admin/api/thong-ke/get-thang-trong-don-hang",
            method: "POST",
            body: ''
        })
            .then(
                result => {
                    this.setState({
                        thangs: result
                    })
                },
                error => {
                    console.log("Lỗi get thang trong don hang " + error);
                }
            ).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                }
            });;
    }
    getDoanhThuHSX = (date) => {
        request({
            url: "/admin/api/thong-ke/get-doanh-thu-hsx",
            method: "POST",
            body: (date)
        })
            .then(
                result => {
                    this.setState({
                        dataBar: result,
                        monthYear: date
                    })
                },
                error => {
                    console.log("Lỗi get thang trong don hang " + error);
                }
            ).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                }
            });;
    }
    getSoLuongGiayBan = () => {
        request({
            url: "/admin/api/thong-ke/get-so-luong-giay-ban",
            method: "POST",
            body: ''
        })
            .then(
                result => {

                    this.setState({
                        soLuongGiayBan: result
                    })
                },
                error => {
                    console.log("Lỗi get so luong giay ban trong tuan: " + error);
                }
            ).catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                }
            });;
    }
    render() {
        const divStyle = {
            height: '400px'
        };
        if (this.state.thangs == null) {
            return <div className="loader" />;
        }
        const donHang = this.state.soDonhang;
        const doanhThu = this.state.doanhThu;
        const dataLine = this.state.dataLine;
        const dataBar = this.state.dataBar;
        let optionThangs = this.state.thangs.map(i => (
            <Option value={i} key={i}>
                {i}
            </Option>
        ));
        const year = this.state.year;
        return (
            <div>

                <Row gutter={16}>
                    <Col xl={8} style={{ marginBottom: 8 }} >
                        <div className="wrapper">
                            <span>Doanh thu tuần này</span>
                            <br />
                            <span>{doanhThu}</span>
                        </div>
                    </Col>
                    <Col xl={8} style={{ marginBottom: 8 }} >
                        <div className="wrapper">
                            <span>Số đơn hàng hôm nay</span>
                            <br />
                            <span>{donHang}</span>
                        </div>
                    </Col>
                    <Col xl={8}>
                        <div className="wrapper">
                            <span>Số lượng giày đã bán trong tuần này</span>
                            <br />
                            <span>{this.state.soLuongGiayBan}</span>
                        </div>
                    </Col>
                </Row>

                <div style={divStyle} className="m-3">
                    <MonthPicker format={monthFormat} placeholder="Chọn Tháng/Năm" className="mb-2" onChange={this.onChangeBar} />

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={dataBar}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tenHangSanXuat" />
                            <YAxis />
                            <Tooltip />
                            {/* formatter={(a,b,c) => { console.log(a,b,c) }} */}
                            <Legend />
                            <Bar dataKey="doanhThu" fill="#376482" name="Doanh thu" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p className="text-center">Biểu đồ doanh thu của từng hãng sản xuất trong tháng {this.state.monthYear}</p>
                </div>
                <div style={divStyle} className="mt-5 ml-3">
                    <Select
                        showSearch
                        allowClear={true}
                        placeholder="Chọn năm"
                        style={{ width: 170, marginBottom: 8 }}
                        onChange={this.onChangeLine}
                    >
                        {optionThangs}
                    </Select>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataLine}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="thang" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-center">Biểu đồ doanh thu từng tháng trong năm {year}</p>
                </div>

            </div >
        );
    }
}

export default StatisticsRevenue;