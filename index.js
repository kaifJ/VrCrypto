import React from 'react';
import { AppRegistry } from 'react-360';
import RightPanel from './src/panels/RightPanel'
import LeftPanel from './src/panels/LeftPanel'
import CryptoModel from './src/panels/CryptoModel'


AppRegistry.registerComponent('LeftPanel', () => LeftPanel);
AppRegistry.registerComponent('RightPanel', () => RightPanel);
AppRegistry.registerComponent('CryptoModel', () => CryptoModel);