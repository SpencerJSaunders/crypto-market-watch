import React from 'react'
import CoinGecko from '../apis/CoinGecko'
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner,  InputGroup, InputGroupAddon, InputGroupText, Input, Toast, ToastBody, ToastHeader, Alert} from 'reactstrap' 
import Chart from 'react-apexcharts'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../css/App.css'

class CoinAnalysis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            coin: '',
            amountPurchased: '',
            startDate: new Date(),
            amountOverTime: '',
            modal: false,
            options: {
        
              xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
              }
            },
            series: [
              {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
              }
            ]
        }

        this.displayCoinInfo = this.displayCoinInfo.bind(this)
        this.fetchCoinData = this.fetchCoinData.bind(this)
        this.calculateAmountOverTime = this.calculateAmountOverTime.bind(this)
        this.numberWithCommas = this.numberWithCommas.bind(this)
    }

    componentDidMount() {
        const url =  new URLSearchParams(this.props.location.search);
        var id = url.get('coin')
        //check if component state for coin doesn't exist
        if(id !== null) {
            //if it doesn't exist then we check to make sure we have a query string parameter for coin id
            this.fetchCoinData(id)   
        }  
    }
      

    async fetchCoinData(id){

            const response = await CoinGecko.get('/coins/' + id, {})
            const {data} = await CoinGecko.get(`/coins/${id}/market_chart`, {
              params: {
                vs_currency: 'usd',
                days: '7',
                interval: 'daily'
              }
            })
            console.log(data)

            let xData = []

            let marketPrices = []

            data.prices.forEach((item) => {

              var xDataDate = new Date(item[0]*1000)
              var dateString = xDataDate.getDay()
              console.log(dateString)

              xData.push(dateString)
              marketPrices.push(item[1].toFixed(2))
            })



            this.setState({
              coin:response.data,
              options: {
                xaxis: {
                  categories: xData
                }
              },
              series: [
                {
                  name: 'Last 7 Days',
                  data: marketPrices
                }
              ]
            })
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

        
    toggle = () =>{

        const modalReverse = !this.state.modal

        this.setState({modal: modalReverse})
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    displayCoinInfo() {

        const url =  new URLSearchParams(this.props.location.search);
        const id = url.get('coin')

        if(this.state.coin.id === id) {
                return (
                    <div>
                                <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        width="100%"
                        height='500'
                      />
                    <img src={this.state.coin.image.small}/>
                    <h1 style={{verticalAlign: 'middle'}} className='d-inline ml-2'>{this.state.coin.name}</h1>
                    <div className='row coin-stats'>
                            <div className='col-12 col-md mb-4 mb-md-0'>
                                    <Toast>
                                        <ToastHeader>
                                        <h5>Market Cap Ranking:</h5>
                                    </ToastHeader>
                                    <ToastBody>
                                        #{this.state.coin.market_cap_rank}                                    
                                    </ToastBody>
                                    </Toast>
                                    <Toast>
                                        <ToastHeader>
                                        <h5>Market Cap:</h5>
                                    </ToastHeader>
                                    <ToastBody>
                                        ${this.numberWithCommas(this.state.coin.market_data.market_cap.usd)}                                    
                                    </ToastBody>
                                    </Toast>
                                    <Toast>
                                        <ToastHeader>
                                        <h5>Current Price:</h5>
                                    </ToastHeader>
                                    <ToastBody>
                                        ${this.state.coin.market_data.current_price.usd}                                  
                                    </ToastBody>
                                    </Toast>
                            </div>
                            <div className='col-12 col-md'>
                            <Toast>
                                <ToastHeader>
                                    <h5>All Time High:</h5>
                                </ToastHeader>
                                <ToastBody>
                                    ${this.state.coin.market_data.ath.usd}                           
                                </ToastBody>
                            </Toast>
                            <Toast>
                                <ToastHeader>
                                    <h5>All Time Low:</h5>
                                </ToastHeader>
                                <ToastBody>
                                    ${this.state.coin.market_data.atl.usd.toFixed(2)}                                  
                                </ToastBody>
                            </Toast>

                            <Toast>
                                <ToastHeader>
                                    <h5>24 Hour Change:</h5>
                                </ToastHeader>
                            <ToastBody>
                                    {
                                    (this.state.coin.market_data.price_change_24h > 0)
                                    ? <span style={{color: 'green'}}>${this.state.coin.market_data.price_change_24h.toFixed(2)}</span>
                                    : <span style={{color: 'red'}}>${this.state.coin.market_data.price_change_24h.toFixed(2)}</span>
                                    }                                    </ToastBody>
                                    </Toast>
                        
                            </div>
                        
                    </div>
                    </div>
                    
                )
        } 
            else {
                return (
                    <div>
                        <Spinner />
                    </div>
                )
            }
     }

    render() {
        let dateToday = new Date().toDateString()

        return (
            <div>
            <div id="coin-details-section">
              <Container id="coin-analysis-container">{this.displayCoinInfo()}</Container>
            </div>
            <div id='value-over-time-section'>
              <Container>
                <h3 className="text-center mb-3">
                  How much would your {this.state.coin.name} be worth if you initially
                  purchased it on a certain date?
                </h3>
                <p style={{fontSize: '18px'}} className="mb-4 text-center">
                  Enter an amount of {this.state.coin.name} and the date you purchased it
                  on to see how much it'd be worth today.
                </p>
                <form onSubmit={this.calculateAmountOverTime}>
                  <p>Amount of $ invested in {this.state.coin.name}:</p>
                  <InputGroup id="initial-amount-field">
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input
                      min="1"
                      value={parseFloat(this.state.amountPurchased)}
                      onChange={(e) =>
                        this.setState({ amountPurchased: parseFloat(e.target.value) })
                      }
                      placeholder="Amount"
                      type="number"
                      step="1"
                    />
                  </InputGroup>
                  <p className="mt-3">Date Purchased:</p>
                  <DatePicker
                    id="start"
                    selected={this.state.startDate}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) => this.setState({ startDate: date })}
                  />
                  <Button color='success' className="d-block mt-3" type="submit" value="Submit">
                    Submit
                  </Button>
                </form>
          
                <div>
                  {!this.state.amountOverTime ? (
                    <div></div>
                  ) : 
                  (
                    <Alert color="success" className='mt-4'>
                      <h5 className='text-center'>Your {this.state.coin.name} would be worth $
                      {this.numberWithCommas(this.state.amountOverTime.toFixed(2))} for
                      today's date of {dateToday}</h5>                    
                      </Alert>
                  )}
                </div>
                <div>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      Enter a date from the past.
                    </ModalHeader>
                    <ModalBody>
                      You picked today's current date of {new Date().toDateString()}. Pick
                      a date from the past.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                        Close
                      </Button>
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
