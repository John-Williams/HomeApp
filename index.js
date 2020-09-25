/**
 * @format
 */
console.log("top of index.js");

import './polyfills'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);