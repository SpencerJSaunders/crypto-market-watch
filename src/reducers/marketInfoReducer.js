export default (state=[], action) => {
    switch(action.type) {
        case 'FETCH_MARKET_INFO':
            return action.payload
        default:
            return state
    }
}