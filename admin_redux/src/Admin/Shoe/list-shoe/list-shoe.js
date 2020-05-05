import React, { Component } from "react";
import PropTypes from "prop-types";
import { GetGiayById, getImageByIdGiay } from "../../../actions/giay/sua-giayAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../Common/Loader/loader.css";
import matchSorter from "match-sorter";
import "react-table/react-table.css";
import { Button, Table, Icon, Modal, Col, Row, Popconfirm, message, Tooltip, Select } from "antd";
import Search from "antd/lib/input/Search";
import DetailShoe from "../detail-shoe/detail-shoe";
import { request } from '../../Common/APIUtils';
import './list-shoe.css';
const { Option, OptGroup } = Select;
class ListShoe extends Component {
  state = {
    items: null,
    filter: null,
    modal: false,
    loadingTable: true,
    shoe: null,
    tenGiay: '',
    gioiTinh: '',
    loaiGiay: '',
    nhaSanXuat: '',
    listLoaiGiay: null,
    listNhaSanXuat: null
  };
  async componentDidMount() {
    // lấy dữ liệu từ Server
    await this.loadDatatable();
    await this.loadHSX();
    await this.loadLoaiGiay();
  }
  loadDatatable() {
    request({
      url: "/admin/api/shoe/list-shoe",
      method: "POST",
      body: JSON.stringify("")
    })
      .then(
        result => {
          console.log(result)
          this.setState({
            items: result,
            filter: result,
            loadingTable: false
          });
        },
        error => {
          console.log("Lỗi get data giày: " + error);
        }
      );
  }
  loadHSX() {
    request({
      url: "/admin/api/data/get-HSX",
      method: "POST",
      body: JSON.stringify("")
    })
      .then(
        result => {
          console.log(result)
          this.setState({
            listNhaSanXuat: result
          })
        },
        error => {
          console.log("Lỗi get data giày: " + error);
        }
      );
  }
  loadLoaiGiay() {
    request({
      url: "/admin/api/data/get-loai-giay",
      method: "POST",
      body: JSON.stringify("")
    })
      .then(
        result => {
          console.log(result)
          this.setState({
            listLoaiGiay: result
          })
        },
        error => {
          console.log("Lỗi get data giày: " + error);
        }
      );
  }
  componentWillReceiveProps(myProps) { }
  onGioiTinhChange = (value) => {
    const gioiTinh = value;
    this.filterWithConditions(this.state.tenGiay, gioiTinh, this.state.nhaSanXuat, this.state.loaiGiay)
    this.setState({
      gioiTinh: gioiTinh
    });
  }
  onHangSanXuatChange = (value) => {
    const nhaSanXuat = value;
    this.filterWithConditions(this.state.tenGiay, this.state.gioiTinh, nhaSanXuat, this.state.loaiGiay)
    this.setState({
      nhaSanXuat: nhaSanXuat
    });
  }
  onSearchChange = e => {
    const tenGiay = e.target.value;
    this.setState({
      tenGiay: tenGiay
    });
    this.filterWithConditions(tenGiay, this.state.gioiTinh, this.state.nhaSanXuat, this.state.loaiGiay)
  };
  onLoaiGiayChange = (value) => {
    const loaiGiay = value;
    this.filterWithConditions(this.state.tenGiay, this.state.gioiTinh, this.state.nhaSanXuat, loaiGiay)
    this.setState({
      loaiGiay: loaiGiay
    });
  }

  filterWithConditions(tenGiay, gioiTinh, nhaSanXuat, loaiGiay) {
    let listTemp = this.state.items;
    if (tenGiay) {
      listTemp = matchSorter(listTemp, tenGiay, {
        keys: ["maGiay", "tenGiay"]
      })
    }
    if (gioiTinh) {
      listTemp = matchSorter(listTemp, gioiTinh, {
        keys: ["tenGioiTinh"]
      })
    }
    if (nhaSanXuat) {
      listTemp = matchSorter(listTemp, nhaSanXuat, {
        keys: ["tenHangSanXuat"]
      })
    }
    if (loaiGiay) {
      listTemp = matchSorter(listTemp, loaiGiay, {
        keys: ["tenLoaiGiay"]
      })
    }

    this.setState({
      filter: listTemp
    })
  }

  deleteShoe(value) {

    request({
      url: "/admin/api/shoe/delete-giay",
      method: "POST",
      body: JSON.stringify(value.idGiay)
    })
      .then(
        result => {
          if (result.status === "success") {
            const data = this.state.items.filter(s => {
              console.log(s);
              return s !== value;
            })
            this.setState({
              items: data,
              filter: data
            });
            message.success('Xóa thành công')
          }
        },
        error => {
          console.log("Lỗi đăng nhập " + error);
        }
      ).catch(error =>{
        if(error.status === 401){
          this.props.handleLogout('/login', 'error','Hết phiên đăng nhập');
        }
      });
  }
  onEdit = value => {
    this.props.GetGiayById(value.idGiay);
    this.props.history.push("/admin/danh-sach-giay/sua-giay");
  };

  showDetailShoe(value) {
    this.setState({
      modal: true,
      shoe: value
    })
  }

  onCancel = () => {
    this.setState({
      modal: false
    })
  }
  showImage(value) {
    this.props.getImageByIdGiay(value.idGiay)
    this.props.history.push("/admin/danh-sach-giay/anh-giay");
  }
  render() {
    if (this.state.listNhaSanXuat == null || this.state.listLoaiGiay == null) {
      return <div className="loader" />;
    }
    let hangSanXuat = this.state.listNhaSanXuat.map(i => (
      <Option value={i.tenHangSanXuat} key={i.idHangSanXuat}>
        {i.tenHangSanXuat}
      </Option>
    ));

    let loaiGiay = this.state.listLoaiGiay.map(i => (
      <Option value={i.tenLoaiGiay} key={i.idLoaiGiay}>
        {i.tenLoaiGiay}
      </Option>
    ));
    const columns = [
      {
        title: "Mã giày",
        dataIndex: "maGiay",
        key: "maGiay",
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => {
          return a.maGiay.localeCompare(b.maGiay);
        }
      },
      {
        title: "Tên giày",
        dataIndex: "tenGiay",
        key: "tenGiay",
        sorter: (a, b) => {
          return a.tenGiay.localeCompare(b.tenGiay);
        }
      },
      {
        title: "Giới tính",
        dataIndex: "tenGioiTinh",
        key: "tenGioiTinh"
      },
      {
        title: "Loại giày",
        dataIndex: "tenLoaiGiay",
        key: "tenLoaiGiay"
      },
      {
        title: "Nhà sản xuất",
        dataIndex: "tenHangSanXuat",
        key: "tenHangSanXuat"
      },
      {
        title: "Giá bán",
        dataIndex: "giaban",
        key: "giaban",
        sorter: (a, b) => {
          return a.giaban.localeCompare(b.giaban);
        },
        render: (text, recored) => {
          const num = recored.giaban.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          return <div>{num}</div>
        }
      },
      {
        title: "Chức năng",
        dataIndex: "idGiay",
        width: '20%',
        render: (text, record) => (
          <div>
            <Button onClick={() => this.onEdit(record)} placeholder="Sửa">
              <Icon type="edit" theme="filled" />
            </Button>
            <Popconfirm placement="topRight" title="Bạn có chắc muốn xóa không?" onConfirm={() => this.deleteShoe(record)} okText="Đồng ý" cancelText="Hủy">
              <Button className="ml-1" placeholder="Xóa">
                <Icon type="delete" theme="filled" />
              </Button>
            </Popconfirm>
            <Button className="ml-1" placeholder="Hình ảnh" onClick={() => this.showImage(record)}>
              <Icon type="picture" />
            </Button>
            <Tooltip placement="topLeft" title="Thêm size giày" >
              <Button className="ml-1" onClick={() => this.showDetailShoe(record)}>
                <Icon type="plus-circle" />
              </Button>
            </Tooltip>
          </div>
        )
      }
    ];
    return (
      <div>
        <Row className="mt-1" gutter={16}>
          <Col xs={6}>
            <Search
              placeholder="Tìm kiếm mã giày/tên giày"
              onChange={this.onSearchChange}
            />
          </Col>
          <Col xs={3}>
            <Select
              showSearch
              allowClear={true}
              placeholder="Chọn giới tính"
              style={{ width: '100%' }}
              onChange={this.onGioiTinhChange}
            >
              <Option value="Unisex">
                Unisex
              </Option>
              <Option value="Nam">
                Nam
              </Option>
              <Option value="Nữ">
                Nữ
              </Option>
            </Select>
          </Col>
          <Col xs={4}>
            <Select
              showSearch
              allowClear={true}
              placeholder="Chọn hãng sản xuất"
              style={{ width: '100%' }}
              onChange={this.onHangSanXuatChange}
            >
              {hangSanXuat}
            </Select>
          </Col>
          <Col xs={4}>
            <Select
              showSearch
              allowClear={true}
              placeholder="Chọn loại giày"
              style={{ width: '100%' }}
              onChange={this.onLoaiGiayChange}
            >
              {loaiGiay}
            </Select>
          </Col>
          <Col>
            <Link to="/admin/danh-sach-giay/them-giay">
              <Button color="primary" className="float-right">
                <Icon type="plus-square" style={{ verticalAlign: 'middle' }} />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={24}>
            <Table
              dataSource={this.state.filter}
              columns={columns}
              pagination={{ pageSize: 10 }}
              loading={this.state.loadingTable}
              rowKey="maGiay"
            />
          </Col>
        </Row>
        <Modal
          title="Size giày"
          visible={this.state.modal}
          width={800}
          // onOk={this.handleOk}
          // confirmLoading={confirmLoading}
          footer={[
            <div></div>,
          ]}
          onCancel={this.onCancel}
          key="imageShoe"
        >
          <DetailShoe shoe={this.state.shoe} />
        </Modal>
      </div>
    );
  }
}
ListShoe.propTypes = {
  GetGiayById: PropTypes.func.isRequired,
  getImageByIdGiay: PropTypes.func.isRequired
};
//functions props từ login action
const mapDispatchToProps = {
  GetGiayById,
  getImageByIdGiay
};
export default connect(
  null,
  mapDispatchToProps
)(ListShoe);
