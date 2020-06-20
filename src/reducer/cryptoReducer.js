const data = [
    { index: 0, crypto: 'BTC' },
    { index: 1, crypto: 'DASH' },
    { index: 2, crypto: 'XMR' },
    { index: 3, crypto: 'ZEN' }
]

let defaultStore = {
    ...data[0]
}

export default cryptoReducer = (state = defaultStore, action) => {
    switch(action.type){
        case 'next': 
            return {
                ...data[action.index]
            }
        default: return state
    }
}