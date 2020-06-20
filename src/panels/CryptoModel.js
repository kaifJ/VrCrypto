import React from 'react'
import { asset, View } from 'react-360';
import Entity from 'Entity'
import { Provider, connect } from 'react-redux'
import { store } from './RightPanel'

class Model extends React.Component {
    render() {
      return (
        <View>
          <Entity
            style={{transform: [{scaleX: 1}, {scaleY: 1}, {scaleZ: 1}, {rotateX: 90}]}}
            source={{
              obj: asset(`models/${this.props.crypto}.obj`),
              mtl: asset(`models/${this.props.crypto}.mtl`)
            }}
          />
        </View>
      );
    }
};

const mapStateToProps = state => {
  return state
}

let BindedComponent = connect(mapStateToProps)(Model)

export default class CryptoModel extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <BindedComponent />
      </Provider>
    )
  }
}