import React from 'react'

class Coin extends React.Component {
        constructor(props) {
            super(props)
            
        }


    render() {
        return (
            <div className="ui grid" style={{marginTop: "20px"}}>
                <div className="two wide column">
                    <img style={{maxWidth: "50px"}} src={this.props.image} />
                </div>
                <div className="two wide column">
                    <p style={{paddingTop: "10px"}}>{this.props.name}</p>
                </div>
                <div className="two wide column">
                    <p style={{paddingTop: "10px"}}>{this.props.currentPrice}</p>
                </div>
            </div>
        )
    }
}


export default Coin