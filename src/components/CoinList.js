import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMarketInfo } from '../actions/'
import Coin from './Coin'
import { Col, Row, Spinner, Button} from 'reactstrap'


class CoinList extends Component {

     constructor(props) {
        super(props)
            this.state = {
            displayAmount: 20,
            sortBy: this.props.sortBy
        }

        this.updateNumberOfCoinsToDisplay = this.updateNumberOfCoinsToDisplay.bind(this)
        this.renderCoins = this.renderCoins.bind(this)
        this.setListFilterState = this.setListFilterState.bind(this)
        this.filterCoinList = this.filterCoinList.bind(this)
    }

    componentDidMount() {


        if(this.props.coins.length > 0 != true) {
            this.props.fetchMarketInfo(this.state.displayAmount)
        }


        this.timerID = setInterval(
            () => this.props.fetchMarketInfo(this.state.displayAmount),
            20000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }


    updateNumberOfCoinsToDisplay() {
        let showMoreSpinner = document.getElementById("show-more-spinner")
        showMoreSpinner.classList.remove('d-none')
        showMoreSpinner.classList.add('d-block')
        this.props.fetchMarketInfo(20 + this.state.displayAmount)
        setTimeout(() => {
            showMoreSpinner.classList.remove('d-block')
            showMoreSpinner.classList.add('d-none')
        }, 900)
        this.setState({displayAmount: this.state.displayAmount + 20})
    }

    filterCoinList(coins) {
        
        let coinList = coins

        if(this.state.sortBy === 'priceAscending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(a.current_price) - parseFloat(b.current_price)
            })
        }
        else if(this.state.sortBy === 'priceDescending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(b.current_price) - parseFloat(a.current_price)
            })
        }
        else if(this.state.sortBy === 'priceChangeAscending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(a.price_change_percentage_24h) - parseFloat(b.price_change_percentage_24h)
            })
        }
        else if(this.state.sortBy === 'priceChangeDescending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(b.price_change_percentage_24h) - parseFloat(a.price_change_percentage_24h)
            })
        }
        else if(this.state.sortBy === 'marketcapAscending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(a.market_cap) - parseFloat(b.market_cap)
            })
        }

        else if(this.state.sortBy === 'marketcapDescending') {
            coinList = coinList.sort((a,b) => {
                return parseFloat(b.market_cap) - parseFloat(a.market_cap)
            })
        }
        

        return coinList
    }

    renderCoins = () => {

        let coinListOrdered = this.filterCoinList(this.props.coins)

        
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
                
    
            return coinListOrdered.map(coin => {

                return (
                    <Coin key={coin.id} counter={++coinCounter} name={coin.name} id={coin.id} symbol={coin.symbol} priceChangePercentage={coin.price_change_percentage_24h} image={coin.image} currentPrice={coin.current_price} marketcap={coin.market_cap}/>
                )
            })
        }
        else {
            return coinListOrdered.map(coin => {
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


setListFilterState(filterType) {
    if(filterType === 'price') {
            if(this.state.sortBy === 'priceDescending') {
                this.setState({sortBy: 'priceAscending'})
            }
            else if(this.state.sortBy === 'priceAscending') {
                this.setState({sortBy: 'priceDescending'})
            }
            else {
                this.setState({sortBy: 'priceAscending'})
            }
    }
    else if(filterType === 'price-change') {
            if(this.state.sortBy === 'priceChangeDescending') {
                this.setState({sortBy: 'priceChangeAscending'})
            }
            else if(this.state.sortBy === 'priceChangeAscending') {
                this.setState({sortBy: 'priceChangeDescending'})
            }
            else {
                this.setState({sortBy: 'priceChangeAscending'})
            }
    }
    else if(filterType === 'marketcap') {
            if(this.state.sortBy === 'marketcapDescending') {
                this.setState({sortBy: 'marketcapAscending'})
            }
            else if(this.state.sortBy === 'marketcapAscending') {
                this.setState({sortBy: 'marketcapDescending'})
            }
            else {
                this.setState({sortBy: 'marketcapAscending'})
            }
    }
    
}


    render() {

        return (
            <div>
                <div className='pt-3 row'>  
                    <div className='col-1'>
                        <p className='font-weight-bold'>#</p>
                    </div>
                    <div className='col'>
                        <p className='font-weight-bold'>Logo</p>
                    </div>
                    <div className='col'>
                        <a id='name' className='coinlist-col-title' onClick={(e) => this.setListFilterState(e.target.id)}>Name</a>
                    </div>
                    <div className='col'>
                        <p id='price' className='coinlist-col-title' onClick={(e) => this.setListFilterState(e.target.id)}>Price</p>
                    </div>
                    <div className='d-none d-sm-block col'>
                        <p id='price-change' className='coinlist-col-title' onClick={(e) => this.setListFilterState(e.target.id)}>Price Change</p>
                    </div>
                    <div className='d-none d-lg-block col'>
                        <p id='marketcap' className='coinlist-col-title' onClick={(e) => this.setListFilterState(e.target.id)}>Market Cap</p>
                    </div>                          
            </div>
                {this.renderCoins()}
                <Spinner className='d-none pt-4' id='show-more-spinner' color="primary" />
                <Button className='mt-4' onClick={this.updateNumberOfCoinsToDisplay} color="primary" size="lg">Load More</Button>{' '}

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
