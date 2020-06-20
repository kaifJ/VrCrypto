import React from 'react'
import { Text, View, Animated } from 'react-360';
import { styles } from '../styles/stylesheet'
import { Provider, connect } from 'react-redux'
import { store } from './RightPanel'

class Panel extends React.Component {
    state ={
      cryptocurrency: {
        open: '',
        close: '',
        high: '',
        low: '',
        volumefrom: '',
        volumeto: ''
      },
      fade: new Animated.Value(0)
    }

    fetchCryptoData = () => {
      fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.props.crypto}&tsym=USD`)
      .then(response => response.json())
      .then(data => {
        this.setState({ cryptocurrency: {
            open: data["Data"][30]["open"],
            close: data["Data"][30]["close"],
            high: data["Data"][30]["high"],
            low: data["Data"][30]["low"],
            volumefrom: data["Data"][30]["volumefrom"],
            volumeto: data["Data"][30]["volumeto"],
          }
        });
      })
    }
  
    componentDidMount() {
      this.fetchCryptoData()

      Animated.timing(
        this.state.fade,
        {
          toValue: 1,
          duration: 1500,
        }
      ).start()
    }

    componentDidUpdate(prevProps){
      if(prevProps.crypto !== this.props.crypto)
        this.fetchCryptoData()
    }
  
    render() {
      let { fade } = this.state
      return(
        <Animated.View style={[styles.wrapper, {opacity: fade}]}>
          <View style={styles.header}>
            <Text style={styles.textSize}>Crypto</Text>
          </View>
          <View>
            <Text>Price Statistics</Text>
            <Text>High: {this.state.cryptocurrency.high}</Text>
            <Text>Low: {this.state.cryptocurrency.low}</Text>
            <Text>Open: {this.state.cryptocurrency.open}</Text>
            <Text>Close: {this.state.cryptocurrency.close}</Text>
            <Text>Volume From: {this.state.cryptocurrency.volumefrom}</Text>
            <Text>Volume To: {this.state.cryptocurrency.volumeto}</Text>
          </View>
        </Animated.View>
      );
    }
}

const mapStateToProps = state => {
  return state
}

const BindedComponent = connect(mapStateToProps)(Panel)

export default class LeftPanel extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <BindedComponent />
      </Provider>
    )
  }
}