import React from 'react'
import {Link} from 'react-router-dom'
import CoinGecko from '../apis/CoinGecko'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../css/App.css'

class CoinAnalysis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coin: '',
            coinQtyPurchased: 0,
            startDate: new Date(),
            amountOverTime: '',
            modal: false
        }

        this.displayCoinInfo = this.displayCoinInfo.bind(this)
        this.fetchCoin = this.fetchCoin.bind(this)
        this.calculateAmountOverTime = this.calculateAmountOverTime.bind(this)
        this.toggle = this.toggle.bind(this)
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

            const response = await CoinGecko.get('/coins/' + id +'', {})
            this.setState({coin:response.data})
    }



    async calculateAmountOverTime(e) {
        
        e.preventDefault() 

        if(this.state.startDate.getDay() === new Date().getDay()) {
            this.toggle()
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

            console.log(response)
            
            let currentValue = response.data.prices[response.data.prices.length-1][1] 
            let initialValue = response.data.prices[0][1]
            this.setState({amountOverTime: currentValue-initialValue})
        }

    }

        
    toggle() {

        const modalReverse = !this.state.modal

        this.setState({modal: modalReverse})
    }



    displayCoinInfo() {

        const url =  new URLSearchParams(this.props.location.search);
        var id = url.get('coin')

        if(this.state.coin.id === id) {
                return (
                    <div>
                        <h5>Coin Name: </h5>
                        <p>{this.state.coin.name}</p>
                        <h5>Market Cap Ranking:</h5>
                        <p>{this.state.coin.market_cap_rank}</p>
                        <h3>How much would your {this.state.coin.name} be worth if you initially purchased it on a certain date?</h3>
                    <p>Enter an amount of {this.state.coin.name} and the date you purchased it on to see how much it'd be worth today.</p>
                    <form onSubmit={this.calculateAmountOverTime}>
                            <p>Amount of {this.state.coin.name} purchased: </p>
                            <input type="text" name="name" value={this.state.coinQtyPurchased} onChange={(e) => this.setState({coinQtyPurchased: parseFloat(e.target.value)})}/>

                            <p className='mt-3'>Date Purchased:</p>
                            <DatePicker id='start' selected={this.state.startDate}  dateFormat="MM/dd/yyyy"
                            onChange={(date) => this.setState({startDate: date }) }/>
                            <input className='d-block' type="submit" value="Submit" />
                    </form>
                  
                    <div>
                        {
                            (!this.state.amountOverTime)
                            ? <div></div>
                            : <div>{this.state.coin.name} {this.state.amountOverTime}</div>
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
