import React, {Component} from 'react';
import './ListShoe.css';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap';

class ShoeItem extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var { shoe } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    <Card className='col-3 pt-2'>
                        <CardImg top className="carImg" src="images/logo.png" alt="Card image cap"/>
                        <CardBody>
                            <CardTitle>{shoe.name}</CardTitle>
                            <CardText>{shoe.price}</CardText>
                            <Button>Xem thông tin</Button>
                        </CardBody>
                    </Card>
                </div>

            </React.Fragment>
        );
    }
}

export default ShoeItem;