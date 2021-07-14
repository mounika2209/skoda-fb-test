const skodaSessionModels = require('../models/skoda-session-schemas');
const redis = require("redis");
const client = redis.createClient();



module.exports = {

    getOrCreateSkodaSession: (sessionId) => {

        return new Promise((resolve, reject) => {
            skodaSessionModels.skodaSessionDetails.findOne({
                session_id: sessionId
            }, (err, res) => {
                if (err) {
                    console.log("111")
                    console.log("error")
                    return err;
                } else {
                    console.log("222")

                    if (res) {
                        console.log("333")
                        console.log("session if", res)
                        resolve(res.session_id)
                    } else {
                        console.log("444")
                        let skodaSession = {
                            'app_id': "skodachannels",
                            'session_id': sessionId,
                            'platform': 'website',
                            'info_status': false,
                            'own_skoda': false
                        }

                        let skodaSessionModel = skodaSessionModels.skodaSessionDetails;

                        let createUser = new skodaSessionModel(skodaSession);

                        createUser.save((err, data) => {
                            if (err) { console.log("***1111")
                                return err;
                            } else { console.log("***2222")
                                console.log("Session Created   else", data)

                                //resolve(data.session_id);
                            }
                        })
                    }
                }
            })
        })
    },
    skodaUpdateInfo: (sessionId, userPhone, userCity, userEmail) => {

        updateJson = {
            //user_name: userName,
            mobile_number: userPhone,
            user_city: userCity,
            user_email: userEmail,
            info_status: true
        }

        skodaSessionModels.skodaSessionDetails.findOneAndUpdate({
            session_id: sessionId
        }, updateJson, (err, result) => {
            if (err) return err;
            else {
                console.log('Result.......', result)
            }
        })
    },
    getSkodaUser: (sessionId) => {
        return new Promise((resolve, reject) => {
            skodaSessionModels.skodaSessionDetails.findOne({
                session_id: sessionId
            }, (err, res) => {
                if (err) return err;
                else {
                    console.log("res+++++", res)
                    resolve(res)
                }
            })
        })
    },
    getCarName: (sessionId) => {
        return new Promise((resolve, reject) => {
            client.get(sessionId, (err, result) => {
                if (err) resolve('')

                if (result) {
                    console.log("result", result)
                    resolve(result)
                }
            })
        })
    },
    getCategory: (sessionId) => {
        return new Promise((resolve, reject) => {
            client.get(sessionId, (err, result) => {
                if (err) resolve('')

                if (result) {
                    console.log("result", result)
                    resolve(result)
                }
            })
        })
    }
}