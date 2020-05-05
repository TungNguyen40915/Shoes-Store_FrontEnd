import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>

        <Navbar color="light" light expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavbarBrand>
              <div>
                <Link to="/">Tổng quan</Link>
              </div>
            </NavbarBrand>
            <NavbarBrand>
              <Link to="/admin/danh-sach-giay">Danh sách giày</Link>
            </NavbarBrand>
            <NavbarBrand>
              <Link to="/admin/nhap-hang">Nhập hàng</Link>
            </NavbarBrand>
            <NavbarBrand>
              <Link to="/admin/don-hang">Danh sách đơn hàng</Link>
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <Link to="">Danh sách giày</Link>
              </NavItem> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <Button type="danger" className="rounded" onClick={() => this.props.onLogout()}>Đăng xuất</Button>
                </DropdownToggle>
                {/* <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/admin/danh-sach-giay/them-giay">thêm giày</Link>
                  </DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu> */}
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
