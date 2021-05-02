import React from 'react'
import {Link} from 'react-router-dom'
import CoinGecko from '../apis/CoinGecko'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../css/App.css'
import parse from 'html-react-parser'

class CoinAnalysis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coin: '',
            amountPurchased: '',
            startDate: new Date(),
            amountOverTime: '',
            modal: false
        }

        this.displayCoinInfo = this.displayCoinInfo.bind(this)
        this.fetchCoin = this.fetchCoin.bind(this)
        this.calculateAmountOverTime = this.calculateAmountOverTime.bind(this)
        this.toggle = this.toggle.bind(this)
        this.numberWithCommas = this.numberWithCommas.bind(this)
    }

    componentDidMount() {
        const url =  new URLSearchParams(this.props.location.search);
        var id = url.get('coin')
        //check if component state for coin doesn't exist
        if(id !== null) {
            //if it doesn't exist then we check to make sure we have a query string parameter for coin id
            this.fetchCoin(id)   
        }  
    }
      

    async fetchCoin(id){

            const response = await CoinGecko.get('/coins/' + id, {})
            this.setState({coin:response.data})
    }



    async calculateAmountOverTime(e) {
        
        e.preventDefault() 

        if(this.state.startDate.getDay() === new Date().getDay()) {
            this.toggle()
        }

        else if(!this.state.amountPurchased) {
            console.log('please entry a valid amount')
        }

        else {

            console.log('made it')
        let response =  await CoinGecko.get(`/coins/${this.state.coin.id}/market_chart/range`, {
                params: {
                    vs_currency: 'usd',
                    from: this.state.startDate.getTime()/1000,
                    to: new Date().getTime()/1000
                }
            })

            
            let currentValue = response.data.prices[response.data.prices.length-1][1] 
            let initialValue = response.data.prices[0][1]
            this.setState({amountOverTime: (currentValue/initialValue)*this.state.amountPurchased})
        }

    }

        
    toggle() {

        const modalReverse = !this.state.modal

        this.setState({modal: modalReverse})
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    displayCoinInfo() {

        const url =  new URLSearchParams(this.props.location.search);
        const id = url.get('coin')
        let dateToday = new Date().toDateString()

        if(this.state.coin.id === id) {
                return (
                    <div class='pt-4'>
                    <img src={this.state.coin.image.small}/>
                    <h1 style={{verticalAlign: 'middle'}} className='d-inline ml-2'>{this.state.coin.name}</h1>
                    <div className='row coin-stats'>
                            <div className='col-12 col-md mb-4 mb-md-0'>
                                <h4>Market Cap Ranking: #{this.state.coin.market_cap_rank}</h4>
                                <h4>Market Cap: ${this.numberWithCommas(this.state.coin.market_data.market_cap.usd)}</h4>
                                <h4>Current Price: ${this.state.coin.market_data.current_price.usd}</h4>
                            </div>
                            <div className='col-12 col-md'>
                            <h4>All Time High: ${this.state.coin.market_data.ath.usd}</h4>
                            <h4>All Time Low: ${this.state.coin.market_data.atl.usd.toFixed(2)}</h4>
                            <h4>24 Hour Change: {
                                (this.state.coin.market_data.price_change_24h > 0)
                                ? <span style={{color: 'green'}}>${this.state.coin.market_data.price_change_24h.toFixed(2)}</span>
                                : <span style={{color: 'red'}}>${this.state.coin.market_data.price_change_24h.toFixed(2)}</span>
                            }</h4>
                            </div>
                        
                    </div>

                        <h3 className='text-center mb-3'>How much would your {this.state.coin.name} be worth if you initially purchased it on a certain date?</h3>
                    <p className='mb-3'>Enter an amount of {this.state.coin.name} and the date you purchased it on to see how much it'd be worth today.</p>
                    <form onSubmit={this.calculateAmountOverTime}>
                            <p>Amount of $ invested in {this.state.coin.name}:</p>
                            <input type="text" pattern="[0-9]*" name="name" value={this.state.amountPurchased} onChange={(e) => this.setState({amountPurchased: parseFloat(e.target.value)})}/>

                            <p className='mt-3'>Date Purchased:</p>
                            <DatePicker id='start' selected={this.state.startDate}  dateFormat="MM/dd/yyyy"
                            onChange={(date) => this.setState({startDate: date }) }/>
                            <input className='d-block mt-3' type="submit" value="Submit" />
                    </form>
                  
                    <div>
                        {
                            (!this.state.amountOverTime)
                            ? <div></div>
                            : <div>Your {this.state.coin.name} would be worth ${this.numberWithCommas(this.state.amountOverTime.toFixed(2))} for today's date of {dateToday}</div>
                        }
                    </div>
                    </div>
                    
                )
        } 
            else {
                return (
                    <div>
                        <Spinner color="primary" />
                    </div>
                )
            }
     }

    render() {

        return (
            <div className='analysis-background'>
                <div>
                <Container id='coin-analysis-container'>
                        <div>
                            {this.displayCoinInfo()}
                        </div>
                        <div>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                <ModalBody>
                                Lorem ipsum dolor sit amet,rud exercitation ullamco labo
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </Container>
                    </div>
            </div>
        )
    }
}



export default CoinAnalysis
