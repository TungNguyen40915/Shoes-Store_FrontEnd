import './GoodsReceipt.css';
import React, { Component } from 'react';
import { Table, Popconfirm, Row, Col, DatePicker, Select, Card, notification, Button } from 'antd';
import { EditableFormRow, EditableCell } from './EditableTableComp';
import { getBrands, getShoes, save } from './GoodsReceiptAPI';
import moment from 'moment';

const Option = Select.Option;
notification.config({
    placement: 'topRight',
    duration: 3,
});

class GoodsReceipt extends Component {
    state = {
        isLoading: false,
        errors: [],
        dataSourceTable: [],
        dataSourceShoes: [],
        listItemShoe: [],
        brands: [],
        dateOfReciept: null,
        selectedBrand: 5,
        isSaved: false,
    };

    columnsConfig = [
        {
            title: 'Mã giày',
            dataIndex: 'shoeCode',
            width: '30%',
        }, {
            title: 'Tên giày',
            dataIndex: 'shoeName',
            width: '30%',
        }, {
            title: 'Số lượng',
            dataIndex: 'amount',
            editable: true,
        }, {
            title: 'Đơn giá',
            dataIndex: 'price',
            editable: true,
        }, {
            title: 'Thành tiền',
            dataIndex: 'total',
        }, {
            title: '',
            dataIndex: '',
            render: (text, record) => (
                this.state.dataSourceTable.length >= 1
                    ? (
                        <Popconfirm title="Bạn có chắc muốn xoá?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="danger">Xoá</Button>
                        </Popconfirm>
                    ) : null
            ),
        }];

    handleDelete = (key) => {
        const dataSourceTable = [...this.state.dataSourceTable];

        const newErrors = this.state.errors
        this.state.errors.forEach(function (error) {
            if (key.toString() === error.key.toString()) {
                const objError = {
                    key: key,
                    error: error
                };
                newErrors.splice(newErrors.indexOf(objError), 1);
            }
        });

        this.setState({
            dataSourceTable: dataSourceTable.filter(item => item.key !== key),
            errors: newErrors
        });
        // this.setState({
        //     dataSourceTable: newData,
        //     errors: newErrors
        // });
    }

    handleAdd = (value) => {
        var shoe = this.state.dataSourceShoes.filter(function (shoe) {
            return shoe.maGiay.toString() === value.toString();
        });

        var isExisted = false;
        if (this.state.dataSourceTable !== null) {
            this.state.dataSourceTable.forEach(function (row) {
                if (row.shoeCode.toString() === value.toString()) {
                    isExisted = true;
                }
            });
        }

        if (isExisted) {
            notification.error({
                message: 'Thông báo',
                description: "Sản phầm này đã được thêm trước đó !",
            });
            return;
        }

        const { count, dataSourceTable } = this.state;
        const newData = {
            key: shoe[0].idGiay,
            shoeCode: value,
            shoeName: shoe[0].tenGiay,
            amount: 1,
            price: shoe[0].giaban,
            total: shoe[0].giaban
        };

        this.setState({
            dataSourceTable: [...dataSourceTable, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSourceTable];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSourceTable: newData });
    }

    handleChangeAmountOrPrice = (row, change) => {
        const newData = [...this.state.dataSourceTable];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        const newTotal = parseInt(item.amount) * parseInt(item.price);
        const rowWithNewTotal = {
            key: item.key,
            shoeCode: item.shoeCode,
            shoeName: item.shoeName,
            amount: item.amount,
            price: item.price,
            total: newTotal
        };
        newData.splice(index, 1, rowWithNewTotal);

        const newErrors = this.state.errors
        this.state.errors.forEach(function (error) {
            if (row.key.toString() === error.key.toString()) {
                const objError = {
                    key: row.key,
                    error: error
                };
                newErrors.splice(newErrors.indexOf(objError), 1);
            }
        });

        this.setState({
            dataSourceTable: newData,
            errors: newErrors
        });
    }

    handleErrorInput = (error, row) => {
        const objError = {
            key: row.key,
            error: error
        };
        const newErrors = this.state.errors;

        var existed = false;
        this.state.errors.forEach(function (error) {
            if (JSON.stringify(objError) === JSON.stringify(error)) {
                existed = true;
            }
        });

        if (!existed) {
            newErrors.push(objError);
            this.setState({
                errors: newErrors
            });
        }
    }

    onChangeDate = (date, dateString) => {
        if (dateString.trim() === '')
            dateString = moment().format('DD-MM-YYYY');
        this.setState({
            dateOfReciept: dateString
        });
    }

    handleBrandChange = (key, value) => {
        var newData = this.state.dataSourceShoes.filter(item => item.tenHangSanXuat === value.props.children)
        var items = [];
        newData.forEach(function (shoe) {
            items.push(<Option key={shoe.maGiay}>{'#' + shoe.maGiay + ' | ' + shoe.tenGiay}</Option>);
        });
        this.setState({
            listItemShoe: items
        })
    }

    saveReceipt = () => {
        if (this.state.errors.length === 0 && this.state.dataSourceTable.length !== 0) {
            var initialValue = 0;
            var sum = this.state.dataSourceTable.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue.amount;
            }, initialValue)

            const request = {
                dateOfReciept: this.state.dateOfReciept,
                brandId: this.state.selectedBrand,
                amount: sum,
                recieptDetails: this.state.dataSourceTable,
            }
            save(request)
                .then(response => {
                    notification.success({
                        message: 'Thông báo',
                        description: "Lưu phiếu nhập thành công",
                    });
                    this.setState({ isSaved: true })
                }).catch(error => {
                    if (error.status === 401) {
                        this.props.handleLogout('/login', 'error', 'You have been logged out. Please login');
                    } else {
                        notification.error({
                            message: 'Thông báo',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
        } else {
            console.log(this.state.errors);
            notification.error({
                message: 'Thông báo',
                description: "Lưu thất bại, vui lòng kiểm tra dữ liệu",
            });
        }
    }

    loadBrand() {
        this.setState({
            isLoading: true
        });
        getBrands()
            .then(response => {
                console.log(JSON.stringify(response));
                var respBrands = [];
                response.forEach(function (brand) {
                    respBrands.push(<Option key={brand.idHangSanXuat}>{brand.tenHangSanXuat}</Option>);
                });

                this.setState({
                    brands: respBrands,
                    isLoading: false,
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    loadShoes() {
        this.setState({
            isLoading: true
        });
        getShoes()
            .then(response => {
                console.log(response);
                const items = []
                response.forEach(function (shoe) {
                    items.push(<Option key={shoe.maGiay}>{'#' + shoe.maGiay + ' | ' + shoe.tenGiay}</Option>);
                });
                this.setState({
                    dataSourceShoes: response,
                    listItemShoe: items,
                    isLoading: false,
                });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
            });
    }

    componentDidMount() {
        this.loadBrand();
        this.loadShoes();
        this.setState({
            dateOfReciept: moment().format("DD-MM-YYYY")
        })
    }

    render() {
        const { isSaved } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columnsConfig.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    handleChangeAmountOrPrice: this.handleChangeAmountOrPrice,
                    handleErrorInput: this.handleErrorInput
                }),
            };
        });

        return (
            <div style={{ padding: '30px' }}>
                <Card title="Thêm đơn nhập hàng" bordered={false}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <DatePicker defaultValue={moment()} format="DD-MM-YYYY" onChange={this.onChangeDate} placeholder="Ngày nhập hàng" style={{ width: '100%' }} />
                        </Col>
                        <Col span={6}>
                            <Select defaultValue="Nike" style={{ width: '100%' }} onChange={this.handleBrandChange}>
                                {this.state.brands}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select
                                showSearch
                                notFoundContent="Không tìm thấy sản phẩm"
                                style={{ width: '100%' }}
                                placeholder="Nhập mã giày hoặc tên giày"
                                optionFilterProp="children"
                                value={"Nhập mã giày hoặc tên giày"}
                                onChange={this.handleAdd}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.listItemShoe}
                            </Select>
                        </Col>
                        <Col span={6}>

                        </Col>
                    </Row>
                    <br />
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        locale={{ emptyText: "Chưa có dữ liệu" }}
                        dataSource={this.state.dataSourceTable}
                        columns={columns}
                    />
                    <br />
                    <Button disabled={isSaved} onClick={this.saveReceipt} style={{ float: 'right' }} type="primary">Lưu</Button>
                </Card>
            </div>
        );
    }
}

export default GoodsReceipt;