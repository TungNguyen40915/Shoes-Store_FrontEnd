import React, { Component } from 'react';
import './ShoeDetail.css';
import CardShoe from '../card-shoe/CardShoe';
import { Button, Spin, notification, message } from 'antd';
import { Radio } from 'antd';
import { Link } from 'react-router-dom';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ShoeDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            thongTinGiay: null,
            danhSachNoiBat: [],
            preIdHangSanXuat: '',
            preIdGiay: '',
            img: null,
            idChiTietGiay: null
        };

    }

    async componentDidMount() {
        await this.setShoeDetail();

    }

    // async componentWillReceiveProps() {
    //     await this.setShoeDetail();
    // }

    setShoeDetail() {

        if (this.props.match.params.id !== '0' && this.state.preIdGiay !== this.props.match.params.id) {
            fetch(`/chi-tiet-giay/thong-tin-giay/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.setState({ thongTinGiay: data, preIdGiay: data.idGiay, img: data.img1 })
                });
        }
    }

    getListDanhSachNoiBac(idHangSanXuat) {
        if (this.state.preIdHangSanXuat !== idHangSanXuat) {
            fetch('/chi-tiet-giay/thong-tin-giay/hang-san-xuat/' + idHangSanXuat)
                .then(response => response.json())
                .then(data => this.setState({ danhSachNoiBat: data, preIdHangSanXuat: idHangSanXuat }));
        }

    }

    onChangeRadioCTG = (e) => {
        console.log(e.target.value);
        const value = e.target.value;
        this.setState({
            idChiTietGiay: value
        })
    }

    setImg = (img) => {
        this.setState({
            img
        })
    }
    // bỏ vào local Storage
    clickDatHang = () => {
        const id = this.state.idChiTietGiay;
        if (id === null) {
            notification.error({
                message: 'Thông báo',
                description: 'Bạn chưa chọn size giày, vui lòng chọn size giày !'
            });
            return;
        }

        const item = {
            id: id,
            amount: 1
        }

        var cart = JSON.parse(localStorage.getItem('items'));
        if (cart === null) {
            var items = [];
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
            console.log(JSON.parse(localStorage.getItem('items')));
            message.success('Đã thêm sản phầm vào giỏ hàng', 4);
            this.props.handleUpdateCart();
            return;
        } else {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id === id) {
                    var temp = cart;
                    temp[i].amount += 1;
                    localStorage.setItem('items', JSON.stringify(temp));
                    console.log(JSON.parse(localStorage.getItem('items')));
                    message.success('Đã thêm sản phầm vào giỏ hàng', 4);
                    this.props.handleUpdateCart();
                    return;
                }
            }

            cart.push(item);
            localStorage.setItem('items', JSON.stringify(cart));
            console.log(JSON.parse(localStorage.getItem('items')));
            message.success('Đã thêm sản phầm vào giỏ hàng', 4);
            this.props.handleUpdateCart();
        }
    }

    render() {

        var { thongTinGiay, danhSachNoiBat } = this.state;
        if (thongTinGiay == null) {
            return <div align="center"><Spin size="large" /></div>;
        }
        var count = true;
        this.getListDanhSachNoiBac(this.state.thongTinGiay.idHangSanXuat);

        if (count) {
            if (this.state.preIdGiay !== this.props.match.params.id) {
                this.setState({
                    preIdGiay: this.props.match.params.id
                });
                this.setShoeDetail();
            }
            count = false;
        }
        const exist = thongTinGiay.xoaFlag;

        const link = '/danh-sach/' + thongTinGiay.idHangSanXuat + '/loai-giay-' + thongTinGiay.tenLoaiGiay;
        const radioBtn = thongTinGiay.listCTG.map((ctg, idx) => {

            if (ctg.soLuong > 0) {
                if (idx % 4 === 0 && idx > 0) {
                    return <span><br /><RadioButton value={ctg.idChiTietGiay} className="m-1" key={idx}>{ctg.size}</RadioButton> </span>
                }
                return <RadioButton value={ctg.idChiTietGiay} className="m-1" key={idx}>{ctg.size}</RadioButton>
            }
            if (ctg.soLuong == 0) {
                return <RadioButton value={ctg.idChiTietGiay} className="m-1" key={idx} disabled>{ctg.size}</RadioButton>
            }
        });

        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a>{thongTinGiay.tenHangSanXuat}</a>
                        </li>
                        <li className="breadcrumb-item " aria-current="page"> <a><Link to={link}>{thongTinGiay.tenLoaiGiay}</Link></a></li>
                        <li className="breadcrumb-item active">
                            <a>{thongTinGiay.tenGiay}</a>
                        </li>
                    </ol>
                </nav>
                {exist && <h5 style={{marginBottom: 300}}>Không tồn tại</h5>}
                {!exist &&
                    <div>
                        <div className="row">
                            <div className="col-md-12 col-lg-8">
                                <img
                                    src={this.state.img}
                                    style={{
                                        width: '100%'
                                    }}
                                    alt="hinh anh" />
                                <div className="row justify-content-center">
                                    <div className="col" onClick={() => this.setImg(thongTinGiay.img1)}>
                                        <img
                                            className="small-image-shoe-detail"
                                            src={thongTinGiay.img1}
                                            alt="hinh anh" />
                                    </div>

                                    <div className="col" onClick={() => this.setImg(thongTinGiay.img2)}>
                                        <img
                                            className="small-image-shoe-detail"
                                            src={thongTinGiay.img2}
                                            alt="hinh anh" />
                                    </div>

                                    <div className="col" onClick={() => this.setImg(thongTinGiay.img3)}>
                                        <img
                                            className="small-image-shoe-detail"
                                            src={thongTinGiay.img3}
                                            alt="hinh anh" />
                                    </div>

                                    <div className="col" onClick={() => this.setImg(thongTinGiay.img4)}>
                                        <img
                                            className="small-image-shoe-detail"
                                            src={thongTinGiay.img4}
                                            alt="hinh anh" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-4 text-center mt-3">
                                <p
                                    className="mx-auto mb-0"
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '1.5rem'
                                    }}>{thongTinGiay.tenHangSanXuat}</p>
                                <p
                                    className="mx-auto mb-0"
                                    style={{
                                        fontWeight: 500,
                                        fontSize: '2rem'
                                    }}>{thongTinGiay.tenGiay}</p>
                                <p
                                    className="mx-auto mb-0"
                                    style={{
                                        fontWeight: 800,
                                        fontSize: '2rem'
                                    }}>{thongTinGiay.giaBan}$</p>

                                <div
                                    style={{
                                        width: '100%',
                                        maxWidth: '450px',
                                        display: 'block'
                                    }}
                                    className="mt-3 mx-auto title-radio">
                                    <span className="float-left chon-size size">Size</span>
                                    <span className="float-right chon-size">Hướng dẫn chọn size</span>
                                </div>

                                <div className="mx-auto mt-3">
                                    <RadioGroup onChange={this.onChangeRadioCTG}>

                                        {radioBtn}

                                    </RadioGroup>
                                </div>

                                <div className="mx-auto mt-3">
                                    <Button className="button" onClick={this.clickDatHang}>Đặt hàng</Button>
                                </div>
                            </div>
                        </div>

                        <h1 className="mt-5 mb-4 text-center">Danh sách nổi bật</h1>
                        <hr />
                        <CardShoe listGiay={danhSachNoiBat} />
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default ShoeDetail;
