import React, {Component} from "react";
import {Radio, InputNumber, Button} from "antd";
import "./SideNav.css";

const RadioGroup = Radio.Group;

class SideNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minPrice: 0,
            maxPrice: 1000,
            hangSanXuat: [],
            loaiGiay: []
        };
    }

    componentDidMount() {
        this.getHangSanXuat();
        this.getLoaiGiay();
    }

    async getHangSanXuat() {
        await fetch("/api/hang-san-xuat")
            .then(response => response.json())
            .then(data => this.setState({hangSanXuat: data}));
    }

    async getLoaiGiay() {
        await fetch("/api/loai-giay")
            .then(response => response.json())
            .then(data => this.setState({loaiGiay: data}));
    }

    changeMin = event => {
        let minPrice = event;

        if (minPrice < 0) {
            minPrice = 0;
        } else if (minPrice > this.state.maxPrice) {
            minPrice = this.state.maxPrice - 1;
        }

        this.setState({minPrice: minPrice});
    };

    changeMax = event => {
        let maxPrice = event;

        if (maxPrice < 0) {
            maxPrice = 0;
        } else if (maxPrice < this.state.minPrice) {
            maxPrice = this.state.minPrice + 1;
        }

        this.setState({maxPrice: maxPrice});
    };

    findByPrice = async() => {
        let min = this.state.minPrice;
        let max = this.state.maxPrice;

        await fetch("/danh-sach/giay/" + min + "/" + max)
        .then(response => response.json())
        .then(data => this.props.onSearch(data));

    };

    thayDoiGioiTinh = async event => {
        await fetch("/danh-sach/giay/" + event.target.value)
            .then(response => response.json())
            .then(data => this.props.onSearch(data));
    };

    thayDoiHangSanXuat = async event => {
        console.log(event.target.value)
        await fetch("/danh-sach/hang-san-xuat/" + event.target.value)
            .then(response => response.json())
            .then(data => this.props.onSearch(data));
    }

    thayDoiLoaiGiay = async event => {
        await fetch("/danh-sach/loai-giay/" + event.target.value)
            .then(response => response.json())
            .then(data => this.props.onSearch(data));
    }

    render() {
        var elmHangSanXuat = this
            .state
            .hangSanXuat
            .map((hangSanXuat, index) => {
                return (
                    <div>
                        <Radio value={hangSanXuat.idHangSanXuat} key={index}>
                            {hangSanXuat.tenHangSanXuat}
                        </Radio>
                        <br/>
                    </div>
                );
            });
        var elmLoaiGiay = this
            .state
            .loaiGiay
            .map((loaiGiay, index) => {
                return (
                    <div>
                        <Radio value={loaiGiay.id} key={index}>
                            {loaiGiay.tenLoaiGiay}
                        </Radio>
                        <br/>
                    </div>
                );
            })

        return (
            <React.Fragment>
                <div className="col-3 my-5">
                    <hr/>
                    <h5>Giới tính</h5>
                    <RadioGroup onChange={this.thayDoiGioiTinh} defaultValue={0} className="pl-3">
                        <Radio value={0}>Tất cả</Radio>
                        <br/>
                        <Radio value={1}>Nam</Radio>
                        <br/>
                        <Radio value={2}>Nữ</Radio>
                        <br/>
                    </RadioGroup>
                    <hr/>
                    <h5>Giá bán</h5>
                    <InputNumber
                        min={0}
                        max={3000}
                        value={this.state.minPrice}
                        onChange={this.changeMin}/>
                    &nbsp; - &nbsp;
                    <InputNumber
                        min={1}
                        max={3000}
                        value={this.state.maxPrice}
                        onChange={this.changeMax}/>
                    <strong>$</strong>
                    &nbsp;
                    <Button type="default" size="default" onClick={this.findByPrice}>
                        Chọn
                    </Button>
                    <hr/>
                    <h5>Hãng sản xuất</h5>
                    <RadioGroup
                        onChange={this.thayDoiHangSanXuat}
                        defaultValue={-1}
                        className="pl-3">
                        <Radio value={-1}>Tất cả</Radio>
                        <br/> {elmHangSanXuat}

                    </RadioGroup>
                    <hr/>
                    <h5>Loại giày</h5>
                    <RadioGroup onChange={this.thayDoiLoaiGiay} defaultValue={-1} className="pl-3">
                        <Radio value={-1}>Tất cả</Radio>
                        <br/> {elmLoaiGiay}
                    </RadioGroup>
                </div>
            </React.Fragment>
        );
    }
}

export default SideNav;
