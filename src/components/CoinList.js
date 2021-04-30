import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMarketInfo } from '../actions/'
import Coin from './Coin'
import { Col, Row, Spinner} from 'reactstrap'


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
                    <Spinner color="primary" />
                </div>
            )
        }
        else {

            let coinCounter = 0

            if(this.props.searchTerm === '') {
            return this.props.coins.map(coin => {

                return (
                    <Coin key={coin.id} counter={++coinCounter} name={coin.name} id={coin.id} symbol={coin.symbol} priceChangePercentage={coin.price_change_percentage_24h} image={coin.image} currentPrice={coin.current_price} marketcap={coin.market_cap}/>
                )
            })
        }
        else {
            return this.props.coins.map(coin => {
                let coin_name = coin.name.toLowerCase()
                if(coin_name.includes(this.props.searchTerm)) {
                    return (
                        <Coin key={coin.id} name={coin.name} priceChangePercentage={coin.price_change_percentage_24h} symbol={coin.symbol} image={coin.image} id={coin.id} currentPrice={coin.current_price} marketcap={coin.market_cap}/>
                    )
                }
            })
        }
    }
 }


    render() {

        return (
            <div>
                <div className='pt-3 row'>  
                    <div className='col-1'>
                        <p>#</p>
                    </div>
                    <div className='col'>
                        <p>Logo</p>
                    </div>
                    <div className='col'>
                        <p>Name</p>
                    </div>
                    <div className='col'>
                        <p>Price</p>
                    </div>
                    <div className='d-none d-sm-block col'>
                        <p>Price Change</p>
                    </div>                             
            </div>
                {this.renderCoins()}
                <p style={{padding:"20px"}} onClick={this.updateNumberOfCoinsToDisplay}>Show More</p>
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
