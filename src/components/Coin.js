import { parse } from 'query-string';
import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col } from 'reactstrap';
import '../css/App.css'

class Coin extends React.Component {
        constructor(props) {
            super(props)
            this.numberWithCommas = this.numberWithCommas.bind(this)
            this.displayPriceChange = this.displayPriceChange.bind(this)
        }

        numberWithCommas(marketcap) {
            const num = marketcap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num
        }

        displayPriceChange(priceChange) {
            const parsedChange = parseFloat(priceChange)

            if(parsedChange > 0) {
                return <p className='pt-2' style={{color: 'green'}}>{parsedChange.toFixed(2)}%</p>
                
            }
            else {
                return <p className='pt-2' style={{color: 'red'}}>{parsedChange.toFixed(2)}%</p>
            }


        }

    render() {

        const linkURLWithParams = `coininfo/?coin=${this.props.id}`

        return (
                    <div className='coin-row-entry'>
                        <div className='row'>
                            <div className='col-1'>
                                <p className='pt-2'>{this.props.counter}</p>
                            </div>
                            <div className='col'>
                                <img className='img-fluid' style={{maxWidth: "40px"}} src={this.props.image} />
                            </div>
                            <div className='col'>
                                <Link to={linkURLWithParams}>
                                    <p className='pt-2'>{this.props.name}</p>
                                </Link>
                            </div>
                            <div className='col'>
                                <p className='pt-2'>${this.numberWithCommas((parseFloat(this.props.currentPrice).toFixed(2)))}</p>
                            </div>
                            <div className='col d-none d-sm-block'>
                                {this.displayPriceChange(this.props.priceChangePercentage)}
                            </div>
                            <div className='col d-none d-lg-block' >
                                ${this.numberWithCommas(parseFloat(this.props.marketcap).toFixed(2))}
                            </div>
                        </div>
                    </div>
        )
    }
}


export default Coin