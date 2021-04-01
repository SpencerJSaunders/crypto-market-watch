import React, { Component } from 'react'
import CoinList from './CoinList'
import SearchBar from './SearchBar'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(15,15,164,1) 17%, rgba(0,212,255,1) 100%)"}}>
            <SearchBar />
            <div className='ui container' style={{backgroundColor: "white", paddingLeft: "20px", paddingRight: "20px"}}>
                <CoinList/>
            </div>
        </div>
        )
    }
}

export default App