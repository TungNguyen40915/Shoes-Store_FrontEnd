import React, { Component } from "react";
import "../../Common/Loader/loader.css";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../create-shoe/create-shoe.css";
import { connect } from "react-redux";
import { Select } from "antd";
import EditShoeForm from "./edit-shoe.form";
import { request } from '../../Common/APIUtils';
const { Option, OptGroup } = Select;
class EditShoe extends Component {
  state = {
    loaiGiays: null,
    gioiTinhs: null,
    form: null

  };
  componentWillReceiveProps(myProps) {
    this.setState({
      form: myProps.giayInfo,
      loaiGiay: myProps.giayInfo.giayInfo.id_loai_giay
    });
  }
  async componentDidMount() {
    await this.loadGender();
    await this.loadCompany();
  }
  loadCompany() {
    request({
      url: "/admin/api/data/get-hang-san-xuat", 
      method: "POST",
      body: JSON.stringify("")
    })
      .then(
        result => {
          const rel = result.map(i => {
            const loaiGiays = i.loaiGiays.map(j => {
              return {
                value: j.idLoaiGiay,
                label: j.tenLoaiGiay
              };
            });
            return {
              label: i.tenHangSanXuat,
              options: loaiGiays
            };
          });
          this.setState({ loaiGiays: rel });
        },
        error => {
          console.log("Lỗi đăng nhập " + error);
        }
      );
  }
  loadGender() {
    request({
      url: "/admin/api/data/get-gender", 
      method: "POST",
      body: JSON.stringify("")
    })
      .then(
        result => {
          const rel = result.map(i => {
            return { value: i.idGioiTinh, label: i.tenGioiTinh };
          });

          this.setState({ gioiTinhs: rel });
        },
        error => {
          console.log("Lỗi đăng nhập " + error);
        }
      );
  }
  render() {
   
    if (this.state.gioiTinhs === null || this.state.loaiGiays === null) {
      return <div className="loader" />;
    }
    if (
      this.state.form == null ||
      Object.keys(this.state.form.giayInfo).length === 0
    ) {
      return <h2>Error</h2>;
    }
    let optionsGT = this.state.gioiTinhs.map(i => (
      <Option value={String(i.value)} key={i.value}>
        {i.label}
      </Option>
    ));
    let optionCom = this.state.loaiGiays.map(i => (
      <OptGroup label={i.label}>
        {i.options.map(j => (
          <Option value={String(j.value)} key={j.value}>
            {j.label}
          </Option>
        ))}
      </OptGroup>
    ));
    return (
      <div>
        <EditShoeForm optionGender={optionsGT} optionCompany={optionCom} editForm={this.state.form}/>    
      </div>
    );
  }
}
const mapStateToProps = state => ({
  giayInfo: state.giayInfo
});
export default connect(mapStateToProps)(EditShoe);
