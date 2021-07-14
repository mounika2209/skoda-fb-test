const axios = require('axios');
const qs = require('qs');
const cons = require('consolidate');
const redis = require("redis");
const client = redis.createClient();

module.exports = {

    getUserDetails: (senderId) => {

        return new Promise((resolve, reject) => {

        var data = qs.stringify({
            'access_token': process.env.ACCESS_TOKEN
        });

        var config = {
            method: 'get',
            url: 'https://graph.facebook.com/v11.0/' +senderId+'/?access_token='+process.env.ACCESS_TOKEN,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log('user name',JSON.stringify(response.data.first_name));
                resolve(response.data.first_name)
            })
            .catch(function (error) {
                console.log(error);
                resolve(' ');
            });
        });

    }
}