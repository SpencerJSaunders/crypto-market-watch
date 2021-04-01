import { useDebugValue } from 'react'
import CoinGecko from '../apis/CoinGecko'

export const fetchMarketInfo = (displayAmount) => async dispatch => {
    const response = await CoinGecko.get('/coins/markets', {
        params: {
            vs_currency: 'usd',
            per_page: displayAmount
        }
    })

    console.log(response)
    dispatch({type: 'FETCH_MARKET_INFO', payload: response.data})
}

export const updateMarketSearchTerm = (searchTerm) => dispatch => {
    console.log(searchTerm)
    dispatch({type: 'UPDATE_SEARCH_TERM', payload: searchTerm})
    
}