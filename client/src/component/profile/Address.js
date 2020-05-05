import React, { Component } from 'react';
import { Card, Icon, Avatar, List } from 'antd';

const { Meta } = Card;


class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 5; j++) {
                children.push(<td>{`Column ${j + 1}`}</td>)
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() {
        const addresses = [
            {
                "name": "john",
                "address": "hcm",
                "phone": "0988221231"
            }, {
                "name": "john",
                "address": "hcm",
                "phone": "0988221231"
            }, {
                "name": "john",
                "address": "hcm",
                "phone": "0988221231"
            }]
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={addresses}
                    renderItem={address => (
                        <List.Item>
                            <Card
                                style={{ width: 300, marginTop: 16 }}
                                actions={[
                                    <Icon type="edit" />,
                                    <Icon type="delete" />,
                                ]}>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="primary address" />
                                <br />
                                <p>Tên: {address.name}</p>
                                <p>Địa chỉ: {address.address}</p>
                                <p>Số điện thoại: {address.phone}</p>
                            </Card>
                        </List.Item>
                    )}
                />

            </div>
        );
    }
}

export default Address;
