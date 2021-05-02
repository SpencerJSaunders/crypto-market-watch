import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateMarketSearchTerm } from '../actions/'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


class SearchBar extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <InputGroup size='md' className='mb-4'>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Search for coin</InputGroupText>
            </InputGroupAddon>
            <Input ame="name" onChange={e => this.props.updateMarketSearchTerm(e.target.value.toLowerCase())}/>
          </InputGroup>
        )
    }
}


//<input type="text" name="name" onChange={e => this.props.updateMarketSearchTerm(e.target.value.toLowerCase())}/>


export default connect(
     null,
    {updateMarketSearchTerm})
    (SearchBar)
