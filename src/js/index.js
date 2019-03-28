// import _ from 'lodash';
import $ from 'jquery';
import test from '../css/main.scss';
import index from '../css/index.scss';
console.log($, '=========================index.js===================')
const a = 1;
let b = 2;
$.ajax({
    url: '/mini_get_car_branch?token=f47ea49539b328a9a3f962b84f298d4c363b0414f7aee8b47d06c1428a70f3ce&pinpai=&chexi=',
    type: 'get',
    success: (res) => {
        let ul = document.createElement('ul');
        let str = '';

        res.data.map((item)=>{
            str += '<li>'+ item.carName +'</li>'
        })
        ul.innerHTML = str;
        document.body.appendChild(ul);
    }
})