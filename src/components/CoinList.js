import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMarketInfo } from '../actions/'
import Coin from './Coin'

class CoinList extends Component {

     constructor(props) {
        super(props)
            this.state = { input: '',
            displayAmount: 10
        }

        this.updateNumberOfCoinsToDisplay = this.updateNumberOfCoinsToDisplay.bind(this)
        this.renderCoins = this.renderCoins.bind(this)
    }

    componentDidMount() {

        this.props.fetchMarketInfo(this.state.displayAmount)


        this.timerID = setInterval(
            () => this.props.fetchMarketInfo(this.state.displayAmount),
            20000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    updateNumberOfCoinsToDisplay() {
        console.log(this.state.displayAmount)
        this.props.fetchMarketInfo(10 + this.state.displayAmount)
        this.setState({displayAmount: this.state.displayAmount + 10})

    }

    renderCoins = () => {
        if(this.props.coins.length === 0) {
            return (
                <div>
                    <p>Loading data...</p>
                </div>
            )
        }
        else {

            if(this.props.searchTerm === '') {
            return this.props.coins.map(coin => {
                return (
                    <Coin key={coin.id} name={coin.name} symbol={coin.symbol} image={coin.image} currentPrice={coin.current_price} />
                )
            })
        }
        else {
            return this.props.coins.map(coin => {
                if(coin.name.includes(this.props.searchTerm)) {
                    return (
                        <Coin key={coin.id} name={coin.name} symbol={coin.symbol} image={coin.image} currentPrice={coin.current_price} />
                    )
                }
            })
        }
    }
 }

    render() {
        return (
            <div>  
                {this.renderCoins()}
                <p style={{padding:"20px"}} onClick={this.updateNumberOfCoinsToDisplay}>Show More</p>
                {this.props.searchTerm}
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        coins: state.coins,
        searchTerm: state.searchTerm
    }
}


export default connect(
    mapStateToProps,
    {fetchMarketInfo})
    (CoinList)
