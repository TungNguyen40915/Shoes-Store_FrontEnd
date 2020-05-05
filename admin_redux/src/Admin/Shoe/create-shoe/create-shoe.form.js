import React, { Component } from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { request } from '../../Common/APIUtils';
const FormItem = Form.Item;
const { TextArea } = Input;
class CreateShoeForm extends Component {

  state = {
    isSaveComplete: false
  };
  handleSubmit = () => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isSaveComplete: true
        });
        this.save(values);
      } 
    });
  };
  isPositiveInteger = (rule, value, callback) => {
    if (value) {
      let intValue = Math.floor(Number(value));
      if (
        !(intValue !== Infinity && String(intValue) === value && intValue > 0)
      ) {
        callback("Yêu cầu nhập số nguyên dương");
      }
    }
    callback();
  };
  save = form => {
    request({
      url: "/admin/api/shoe/save", 
      method: "POST",
      body: JSON.stringify(form)
    })
      .then(
        result => {
          this.setState({
            isSaveComplete: false
          })
          if (result.status === "unique") {
            message.warning("Mã giày đã tồn tại");
            return;
          }
          if (result.status === "invalid") {
            message.warning("Input không hợp lệ");
            return;
          }
          message.success("Lưu thành công");
          
        }
      ).catch(error =>{
        console.log(error);
      });
  };
  componentDidMount() {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <Row gutter={16}>
            <Col xs={24} sm={8} md={8}>
              <label>Mã giày</label>
              <FormItem>
                {getFieldDecorator("maGiay", {
                  rules: [
                    { required: true, message: "Yêu cầu nhập mã giày!" },
                    { max: 255, message: "Số kí tự tối đa là 255!" }
                  ]
                })(<Input type="text" />)}
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={8}>
              <label>Tên giày</label>
              <FormItem>
                {getFieldDecorator("tenGiay", {
                  rules: [
                    { required: true, message: "Yêu cầu nhập tên giày!" },
                    { max: 100, message: "Số kí tự tối đa là 100!" }
                  ]
                })(<Input type="text" />)}
              </FormItem>
            </Col>
            <Col xs={24} sm={6} md={6}>
              <label>Loại giày</label>
              <FormItem>
                {getFieldDecorator("id_loai_giay", {
                  rules: [
                    { required: true, message: "Yêu cầu chọn loại giày!" }
                  ]
                })(
                  <Select
                    showSearch
                    allowClear={true}
                    placeholder="Chọn loại giày"
                    // onChange={this.handleChange.bind(this)}
                  >
                    {this.props.optionCompany}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={8} md={8}>
              <label>Ghi chú</label>
              <FormItem>
                {getFieldDecorator("ghiChu", {
                  rules: []
                })(<TextArea rows={3} />)}
              </FormItem>
            </Col>
            <Col xs={24} sm={8} md={8}>
              <label>Giá bán</label>
              <FormItem>
                {getFieldDecorator("giaBan", {
                  rules: [
                    { required: true, message: "Yêu cầu nhập giá bán!" },
                    {
                      validator: this.isPositiveInteger,
                      message: "Yêu cầu nhập số nguyên dương!"
                    },
                    { max: 10, message: "Nhập tối đa 10 kí tự số" }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col xs={24} sm={6} md={6}>
              <label>Giới tính</label>
              <FormItem>
                {getFieldDecorator("id_gioi_tinh", {
                  rules: [
                    { required: true, message: "Yêu cầu chọn giới tính!" }
                  ]
                })(
                  <Select
                    showSearch
                    allowClear={true}
                    placeholder="Chọn giới tính"
                    // onChange={this.handleChange.bind(this)}
                  >
                    {this.props.optionGender}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Button size={"large"} loading={this.state.isSaveComplete} onClick={this.handleSubmit}>
            Lưu
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(CreateShoeForm);
