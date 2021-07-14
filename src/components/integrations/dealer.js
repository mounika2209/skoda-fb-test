const axios = require('axios');
const qs = require('qs');
const cons = require('consolidate');
const redis = require("redis");
const client = redis.createClient();

module.exports = {

	dealerApi: (userPincode, dealerType) => {

		return new Promise((resolve, reject) => {

			// (checkType == 'Services') {
				var data = JSON.stringify({"pincode":userPincode,"keyType":dealerType});
			// } else {
			// 	let userData = {
			// 		"city": userPincode,
			// 		"keyType": dealerType
			// 	}

			// }

			let config = {
				method: 'post',
				url: 'http://skoda-test.herokuapp.com/pincode-dealers',
				headers: { 
                    'Content-Type': 'application/json', 
                    'Cookie': 'connect.sid=s%3Ag4OwbfCqq1VhNrQdgWqZtDlNgQRQrJ57.QyLrPILjpa8CsVeBxkXexVOVETtJnF2n1kaEm7ny9Uc'
                  },
                data : data
			};

			axios(config)
				.then(function (response) { // console.log("dealerLocation::", response.data.result)
					let responseStatus = response.data.result;
                    let value = [];
					// responseStatus.forEach(dealerLocation => { 
					// 	if (!dealerLocation.contact_no) {
					// 		let subtitle = 'Address: ' + dealerLocation.address + ' Email:' + dealerLocation.email + ' %lat %' + dealerLocation.latitude + ' %long %' + dealerLocation.longitude + '% title%' + dealerLocation.dealer_name;
					// 		value.push(subtitle);
                            
					// 	} else {
					// 		let subtitle = 'Address: ' + dealerLocation.address + ' Contact: ' + dealerLocation.contact_no + ' Email:' + dealerLocation.email + ' %lat %' + dealerLocation.latitude + ' %long %' + dealerLocation.longitude + '% title%' + dealerLocation.dealer_name;
					// 		value.push(subtitle);
                            
					// 	}

					// });
                    resolve(responseStatus)
				}).catch(function (error) {
                    resolve('')
					console.log("error");
				});


		});

	}
}