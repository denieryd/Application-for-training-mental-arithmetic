// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router';
import store from './store/';
import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyCcI4kBCa8LTxpDiS8YeKp12uAcuk9sjZ8",
    authDomain: "mental-7912c.firebaseapp.com",
    databaseURL: "https://mental-7912c.firebaseio.com",
    projectId: "mental-7912c",
    storageBucket: "mental-7912c.appspot.com",
    messagingSenderId: "7528187351",
    appId: "1:7528187351:web:1985e9a0b402d829843792"
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
