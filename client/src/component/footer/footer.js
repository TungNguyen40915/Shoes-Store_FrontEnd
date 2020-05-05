import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {

    render() {

        return (
            <React.Fragment>
               <footer className="page-footer font-small pt-4 black-footer mt-3">
                    <div className="container-fluid text-center text-md-left ">
                        <div className="row">
                            <div className="col-md-6 mt-md-0 mt-3">
                                <h5 className="text-uppercase text-color">Thông tin cửa hàng</h5>
                                <p><a href="#!" className="link-footer"><b>Giới thiệu về cửa hàng</b></a></p>
                                <p>Địa chỉ cửa hàng: 10 Nguyễn Văn Cừ, P.1, Q.1, TpHCM</p>
                            </div>
                            <hr className="clearfix w-100 d-md-none pb-3" />
                            <div className="col-md-3 mb-md-0 mb-3">

                                <h5 className="text-uppercase text-color">FAQ</h5>

                                <ul className="list-unstyled">
                                    <li>
                                        <p> <a href="#" className="link-footer"><b>Vận chuyển</b></a> </p>
                                    </li>
                                    <li>
                                        <p>
                                            <a href="#" className="link-footer"><b>Chính sách đổi trả</b></a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <a href="#" className="link-footer"><b>Hình thức thanh toán</b></a>
                                        </p>

                                    </li>
                                </ul>

                            </div>
                            <div className="col-md-3 mb-md-0 mb-3">
                                <h5 className="text-uppercase text-color">CSKH</h5>

                                <ul className="list-unstyled">
                                    <li>
                                        <p>Hotline: 1900 8111</p>
                                    </li>
                                    <li>
                                        <p>Gặp vấn đề về chất lượng sản phẩm hoặc vận chuyển vui lòng liên hệ (028) 7307 1441</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="container-fluid text-left">
                        <div className="row">
                            <div className="col-md-8">
                                <span>Địa chỉ đăng ký kinh doanh: 10 Nguyễn Văn Cừ, P.1, Q.1, TpHCM - Điện thoại: 028 3868 4857</span>
                                <br />
                                <span>Giấy CNĐKDN: 0310874914 – Ngày cấp: 25/11/2011 - Cơ quan cấp: Phòng Đăng Ký Kinh Doanh – Sở Kế Hoạch và Đầu Tư TP.HCM</span>
                            </div>
                           
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;
