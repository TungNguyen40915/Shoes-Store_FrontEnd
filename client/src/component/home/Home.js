import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import CarouselCustom from '../carousel/Carousel';
import CardShoe from '../card-shoe/CardShoe';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.getDanhSachGiayNoiBac();
        this.getDanhSachGiayBanChay();
    }

    // Danh sách cho giày nổi bậc
    async getDanhSachGiayNoiBac() {
        await fetch('/api/list-giay-noi-bac')
            .then(response => response.json())
            .then(data => {
                this.props.getListGiayNoiBac(data)
            });
    }

    // Danh sách giày bán chạy
    async getDanhSachGiayBanChay() {
        await fetch('/api/list-giay-ban-chay')
            .then(response => response.json())
            .then(data => this.props.getListGiayBanChay(data));
    }

    render() {

        return (
            <React.Fragment>
                <CarouselCustom />
                <h1 className="mt-5 mb-4 text-center">Danh sách nổi bậc</h1>
                <hr />
                <CardShoe listGiay={this.props.giay.listGiayNoiBac} />

                <h1 className="mt-5 mb-4 text-center">Bán chạy nhất</h1>
                <hr />
                <CardShoe listGiay={this.props.giay.listGiayBanChay} />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return { giay: state.giay }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListGiayNoiBac: (listGiayNoiBac) => {
            dispatch(actions.list_giay_noi_bac(listGiayNoiBac));
        },
        getListGiayBanChay: (listGiayBanChay) => {
            dispatch(actions.list_giay_ban_chay(listGiayBanChay));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
