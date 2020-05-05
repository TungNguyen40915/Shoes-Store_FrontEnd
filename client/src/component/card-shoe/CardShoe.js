import React, {Component} from 'react';
import { Card, Spin } from 'antd';
import { withRouter } from 'react-router-dom';

import './CardShoe.css';

class CardShoe extends Component {

    constructor(props) {
        super(props);

    }

    handleClick = (giay) => {
        console.log(giay)
        window.scrollTo(0, 0);
        ///danh-sach/'+giay.idHangSanXuat+'/loai-giay-'+giay.loaiGiay+'
        this.props.history.push('/chi-tiet-giay/' + giay.idGiay+'/'+giay.tenGiay);

    }

    render() {
        var {listGiay} = this.props;
        if(!listGiay || listGiay.length <= 0) {
            return <div align="center"><Spin size="large"/></div>;
        }
        
        var eleListGiay = listGiay.map((giay, index) => {
            return (
                <div className="col-md-6 col-lg-3 mt-2 " key={index}>
                    <Card className="card-shoe" onClick={()=>this.handleClick(giay)}>
                        <div>
                            <img
                                alt={giay.tenGiay}
                                width="100%"
                                style={{
                                height: '150px'
                            }}
                                src={giay.img}/>
                        </div>
                        <div className="mt-4">
                            <p>{giay.loaiGiay}</p>
                            <p>{giay.gioiTinh}</p>
                            <hr/>
                            <h6>{giay.tenHangSanXuat}</h6>
                            <h6> {giay.tenGiay}</h6>
                            <p>{giay.giaBan}$</p>
                        </div>
                    </Card>
                </div>

            );
        });
        
        return (
            <React.Fragment>
                <div className="row">
                    {eleListGiay}
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(CardShoe);
