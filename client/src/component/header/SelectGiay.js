import React, { Component } from 'react';
import './Header.css';
import { withRouter } from 'react-router-dom';

import { Select } from 'antd';
const Option = Select.Option;

class SelectGiay extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(value) {
        if (value != null) {
            this
                .props
                .history
                .push('/chi-tiet-giay/' + value);

        }
    }

    render() {

        var { listTenGiay } = this.props;

        var eleList = listTenGiay
            .map((tenGiay, index) => {
                return <Option value={tenGiay.id} key={tenGiay.id}>{tenGiay.tenGiay}</Option>;
            });

        return (

            <React.Fragment>

                <Select
                    allowClear
                    showSearch
                    style={{
                        width: 300
                    }}
                    placeholder="Chọn tên giày"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {eleList}
                </Select>

            </React.Fragment>
        );
    }
}
export default withRouter(SelectGiay);