import { createStore } from 'redux'
import cryptoReducer from '../reducer/cryptoReducer'

export default () => {
    let store = createStore(cryptoReducer)
    return store
}