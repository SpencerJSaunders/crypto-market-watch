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
                return <p className='pt-2' style={{color: 'green'}}>{parsedChange}%</p>
                
            }
            else {
                return <p className='pt-2' style={{color: 'red'}}>{parsedChange}%</p>
            }


        }

    render() {

        const linkURLWithParams = `coininfo/?coin=${this.props.id}`

        return (
                    <div className='coin-row-entry'>
                        <div className='row'>
                            <div className='col-1'>
                                {this.props.counter}
                            </div>
                            <div class='col'>
                                <img className='img-fluid' style={{maxWidth: "40px"}} src={this.props.image} />
                            </div>
                            <div class='col'>
                                <Link to={linkURLWithParams}>
                                    <p className='pt-lg-2'>{this.props.name}</p>
                                </Link>
                            </div>
                            <div class='col'>
                                <p className='pt-lg-2'>${(parseFloat(this.props.currentPrice).toFixed(2))}</p>
                            </div>
                            <div class='col d-none d-sm-block' style={{wordWrap: 'break-word'}}>
                                {this.displayPriceChange(this.props.priceChangePercentage)}
                            </div>
                        </div>
                    </div>
        )
    }
}


export default Coin