import React from 'react'
import { Text, View, VrButton } from 'react-360';
import { styles } from '../styles/stylesheet'
import { Provider, connect } from 'react-redux'
import configureStore from '../store/configureStore'
import { getNextCrypto } from '../actions/cryptoAction'
import fetchData from '../server_actions/fetch-data'

export const store = configureStore()

class Panel extends React.Component {
    state = {
      cryptoData: {
        symbol: '',
        algorithm: '',
        proofType: '',
        blockNumber: '',
        blockTime: '',
        blockReward: ''
      },
      crypto: ''
    }

    fetchCryptoData = () => {
      let url = `https://min-api.cryptocompare.com/data/coin/generalinfo?fsyms=${this.props.crypto}&tsym=USD&api_key=1bd0917187334c260db80edb86b250d88a7fe2c3721153a3467742137b6499ba`
      fetchData(url)
      .then(response => response.json())
      .then(data => this.setState({
        cryptoData: {
          symbol: data["Data"][0]["CoinInfo"]["Name"],
          algorithm: data["Data"][0]["CoinInfo"]["Algorithm"],
          proofType: data["Data"][0]["CoinInfo"]["ProofType"],
          blockNumber: data["Data"][0]["CoinInfo"]["BlockNumber"],
          blockTime: data["Data"][0]["CoinInfo"]["BlockTime"],
          blockReward: data["Data"][0]["CoinInfo"]["BlockReward"],
          }
        })
      )
    }
  
    componentDidMount() {
      this.fetchCryptoData()
    }

    componentDidUpdate(prevProps){
      if(prevProps.crypto !== this.props.crypto)
        this.fetchCryptoData()
    }

    _getNextCrypto = index => {
      this.props.dispatch(getNextCrypto(index))
    }
    
    render() {
      
      return(
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.textSize}>Information</Text>
          </View>
          <View>
            <Text>Symbol: {this.state.cryptoData.symbol}</Text>
            <Text>Algorithm: {this.state.cryptoData.algorithm}</Text>
            <Text>Proof Type: {this.state.cryptoData.proofType}</Text>
            <Text>Block Number: {this.state.cryptoData.blockNumber}</Text>
            <Text>Block Time: {this.state.cryptoData.blockTime}</Text>
            <Text>Block Reward: {this.state.cryptoData.blockReward}</Text>
          </View>
          <VrButton 
            style={styles.button}
            onClick={() => this._getNextCrypto(this.props.index)}
          >
            <Text style={styles.textSize}>Next</Text>
          </VrButton>
        </View>
      );
    }
}

const mapStateToProps = state => {
  return state
}

let BindedComponent =  connect(mapStateToProps)(Panel)

export default class RightPanel extends React.Component{
  render(){
    return (
      <Provider
        store={store}
      >
        <BindedComponent />
      </Provider>
    )
  }
}