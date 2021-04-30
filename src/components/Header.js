import React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
  import {Link} from 'react-router-dom'



class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        let toggleInverse = !this.state.isOpen
        this.setState({isOpen: toggleInverse})
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <div className='container'>
                        <NavbarBrand href="/">Crypto Market Watch</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link to='/'>
                                    <p className='nav-link'>Market Overview</p>
                                </Link>
                            </NavItem>
                            </Nav>
                        </Collapse>
                </div>
                </Navbar>
          </div>
        )
    }
}

export default Header