import React from 'react'
import { asset, View, Animated } from 'react-360';
import Entity from 'Entity'
import { Provider, connect } from 'react-redux'
import { store } from './RightPanel'

const AnimatedEntity = Animated.createAnimatedComponent(Entity)

class Model extends React.Component {
    state = {
      rotation: new Animated.Value(0),
      bounceValue: new Animated.Value(0.5)
    }

    componentDidMount(){
      Animated.loop(
        this.state.rotation,{
          toValue: 360,
          duration: 6000
        }
      )
    }

    rotations = {
      BTC: {
        rotateX: 90,
        rotateY: 0,
        rotateZ: this.state.rotation,
      },
      DASH: {
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0,
      },
      XMR: {
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0,
      },
      ZEN: {
        rotateX: 0,
        rotateY: this.state.rotation,
        rotateZ: 0,
      }
    };

    render() {
      let { fade } = this.state
      return (
        <Animated.View style={{opacity: fade}}>
          <AnimatedEntity
            style={{transform: [
              {scaleX: 1}, {scaleY: 1}, {scaleZ: 1}, 
              {rotateX: this.rotations[`${this.props.crypto}`].rotateX}, 
              {rotateY: this.rotations[`${this.props.crypto}`].rotateY}, 
              {rotateZ: this.rotations[`${this.props.crypto}`].rotateZ}
            ]}}
            source={{
              obj: asset(`models/${this.props.crypto}.obj`),
              mtl: asset(`models/${this.props.crypto}.mtl`)
            }}
          />
        </Animated.View>
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