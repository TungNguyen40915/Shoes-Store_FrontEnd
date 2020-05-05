import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import { Button, Icon, Row, Col, message } from 'antd';
import "./upload-img.css";
import { connect } from "react-redux";
import { request } from '../../Common/APIUtils';
import "../../Common/Loader/loader.css";
import Dropzone from 'react-dropzone';


class UploadImg extends Component {

    state = {
        pictures: [],
        oldImgs: null,
        isSaveComplete: false
    }
    componentWillMount() {

    }
    componentDidMount() {
        console.log(this.state.pictures)
    }
    componentWillReceiveProps(myprops) {
        const imgs = myprops.ImageShoe.giayInfo;
        const pictures = this.state.pictures;
        if (imgs.img1 !== null && imgs.img1 !== "") {
            this.setState({
                pictures: [imgs.img1, imgs.img2, imgs.img3, imgs.img4, ...pictures]
            })
        }
        this.setState({
            oldImgs: imgs
        })
    }

    onDrop = (files) => {

        const arrPicture = this.state.pictures.slice();
        files.map(x => {
            arrPicture.push(x)
        })

        if (arrPicture.length <= 4) {
            this.setState({
                pictures: arrPicture
            })
        } else {
            message.warning('Chỉ chọn tối đa 4 tấm ảnh')
        }

    }

    onUpload = () => {

        if (this.state.pictures.length == 0) {
            message.warning('Hình ảnh không được rỗng!')
            return;
        }
        if (this.state.pictures.length < 4) {
            message.warning('Phải tải lên đúng 4 tấm ảnh!')
            return;
        }
        if (this.state.pictures.length == 4) {
            this.setState({
                isSaveComplete: true
            })
            let data = new FormData();
            let count = 0;
            this.state.pictures.forEach(i => {

                if (typeof i == "object") {
                    data.append("filepart", i)
                    count++;
                } else {
                    data.append("file", i);
                }
            })

            if (count === 4) {
                data.append("file", null);
            }
            data.append("idGiay", this.state.oldImgs.id);
            fetch("/admin/api/shoe/save-img", {
                method: "POST",
                body: data,
            })
                .then(res => res.json())
                .then(
                    result => {
                        if (result.status === 'success') {
                            this.setState({
                                isSaveComplete: false
                            })
                            message.success('Tải ảnh lên thành công!');
                        } else {
                            message.error('Tải ảnh lên thất bại')
                        }
                    },
                    error => {
                        console.log("Lỗi upload ảnh " + error);
                    }
                ).catch(error => {
                    if (error.status === 401) {
                        this.props.handleLogout('/login', 'error', 'Hết phiên đăng nhập');
                    }
                });;
        } else {
            message.warning('Chỉ tải lên tối đa 4 tấm ảnh')
        }
    }
    onDelete(index) {

        const pictures = this.state.pictures.filter((file, i) => {
            return i !== index
        })
        this.setState({
            pictures: pictures,
        })
    }

    render() {
        if (this.state.oldImgs == null) {
            return <div className="loader" />;
        }
        console.log(this.state.pictures)
        const image = this.state.pictures.map((file, i) => {
            if (typeof file == "object") {
                return <div>
                    <div className="wrapper mb-2">
                        <img src={URL.createObjectURL(file)} alt="img" className="thumbnail img-thumbnail" />
                        <div className="button"><Button type="primary" onClick={() => this.onDelete(i)}><Icon type="delete" /></Button></div>
                    </div>
                </div>
            } else {
                return <div>
                    <div className="wrapper mb-2">
                        <img src={file} alt="img" className="thumbnail img-thumbnail" />
                        <div className="button"><Button type="primary" onClick={() => this.onDelete(i)}><Icon type="delete" /></Button></div>
                    </div>
                </div>
            }
        })
        return (
            <div>
                <div className="container-flex mb-3">
                    {image}
                </div>

                <Dropzone
                    accept="image/*"
                    onDrop={this.onDrop}
                    maxSize={5242880}
                    multiple={true}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div align="center">
                                <p>Bỏ ảnh vào đây</p>
                                <Button size="large">Chọn ảnh</Button>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <Button type="button" className="mt-2" onClick={this.onUpload} loading={this.state.isSaveComplete}><Icon type="upload" /></Button>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ImageShoe: state.giayInfo
});
export default connect(mapStateToProps)(UploadImg);