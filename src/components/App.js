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
                            <div className='p-3'>
                                <CoinList sortBy='default'/>
                            </div>
                </Container>
            </div>
        )
    }
}

export default App