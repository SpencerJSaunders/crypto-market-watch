import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateMarketSearchTerm } from '../actions/'


class SearchBar extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <input type="text" name="name" onChange={e => this.props.updateMarketSearchTerm(e.target.value)}/>
        )
    }
}




export default connect(
     null,
    {updateMarketSearchTerm})
    (SearchBar)
