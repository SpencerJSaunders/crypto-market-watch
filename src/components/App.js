import React, { Component } from 'react'
import CoinList from './CoinList'
import SearchBar from './SearchBar'
import { Container, Row, Col } from 'reactstrap';


class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Container className='pt-5'>
                            <SearchBar className='mt-3'/>
                            <div style={{backgroundColor: "white", paddingLeft: "20px", paddingRight: "20px", borderRadius: '25px'}}>
                                <CoinList/>
                            </div>
                </Container>
            </div>
        )
    }
}

export default App