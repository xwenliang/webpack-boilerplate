import vendor1 from '../vendor/vendor1';
import vendor2 from '../vendor/vendor2';
import _ from 'lodash';
import styles from './page1.css';

// get url
import config from './index.js';

webpackJsonp(config);

console.log('-----------', config);

//import image1 from '../images/stack1.png';

//let image1 = require('../images/stack1.png');

const arr = [
    require('../images/stack1.png'),
    require('../images/stack2.png')
];

console.log(arr);

console.log('abc');

console.log('hhaha');

export default {
    a: 1
}