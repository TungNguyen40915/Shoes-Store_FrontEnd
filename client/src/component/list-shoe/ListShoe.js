import React, { Component } from 'react';
import './ListShoe.css';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import SideNav from '../side-nav/SideNav';
import CardShoe from '../card-shoe/CardShoe';

class ListShoe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listGiay: [],
            tempList: []
        };
    }

    async componentDidMount() {

        await this.getGiays(this.props.match.params.id);
    }
    async componentWillReceiveProps(myProps){

        await this.getGiays(myProps.match.params.id);
    }
    getGiays(id) {
        fetch('/danh-sach/loai-giay/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ listGiay: data, tempList: data })
            });
    }

    sortGiay = (e) => {

        if (e.key == 1) {
            let list = this
                .state
                .tempList
                .sort((giay1, giay2) => {
                    if (giay1.tenGiay > giay2.tenGiay) {
                        return 1;
                    } else if (giay1.tenGiay < giay2.tenGiay) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            this.setState({ tempList: list })

            // Z - A
        } else if (e.key == 2) {
            let list = this
                .state
                .tempList
                .sort((giay1, giay2) => {
                    if (giay1.tenGiay > giay2.tenGiay) {
                        return -1;
                    } else if (giay1.tenGiay < giay2.tenGiay) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            this.setState({ tempList: list })
        }

    }

    onSearch = (listGiay) => {
        this.setState({
            listGiay: listGiay,
            tempList: listGiay
        })
    }

    render() {

        var { listGiay, tempList } = this.state;
        var menu = (
            <Menu onClick={this.sortGiay}>
                <Menu.Item key="1"><Icon type="caret-down" />A - Z</Menu.Item>
                <Menu.Item key="2"><Icon type="caret-up" />Z - A</Menu.Item>
            </Menu>
        );
            console.log(tempList)
        return (
            <React.Fragment>
                <div className="row">
                    <SideNav onSearch={this.onSearch} />

                    <div className="col-9 mt-3">
                        <div className="row">
                            <div className="col-6">
                                <h5>Kết quả tìm kiếm</h5>
                            </div>

                            <div className="col-6 text-right">
                                <Dropdown overlay={menu}>
                                    <Button
                                        style={{
                                            marginLeft: 8
                                        }}>
                                        Sắp xếp
                                        <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        <CardShoe listGiay={tempList} />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default ListShoe;