import React, { Component } from "react";
import "../../Common/Loader/loader.css";
import { Select } from "antd";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import "./create-shoe.css";
import CreateShoeForm from "./create-shoe.form";
import { request } from '../../Common/APIUtils';
const { Option, OptGroup } = Select;
class CreateShoe extends Component {
  state = {
    loaiGiays: null,
    gioiTinhs: null
  };
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
        <CreateShoeForm optionGender={optionsGT} optionCompany={optionCom} />
      </div>
    );
  }
}

export default CreateShoe;
