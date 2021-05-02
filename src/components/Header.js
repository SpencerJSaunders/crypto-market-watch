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
  import '../css/App.css'
  import CoinGeckoLogo from '../images/coingecko.png'



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
                        <i className="fa fa-bitcoin fa-2x mr-2" style={{color: 'white'}}></i>
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
                        <div class='d-none d-md-block'>
                            <p class='d-inline-block' id='powered-text'>Powered By</p>
                            <a target='_blank' href='https://coingecko.com'>
                                <img src={CoinGeckoLogo} className='img-fluid coingecko-logo' alt='Coin Gecko Logo'/>
                            </a>
                        </div>
                </div>
                </Navbar>
          </div>
        )
    }
}

export default Header