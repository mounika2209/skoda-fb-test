const request = require('request-promise');

module.exports = {
    publishAnalytic: (rclient, from, handled, intent, msg, session_id, app_name) => {
        let incr = rclient.incr(session_id, (err, index) => {
            let options = {
                "app_id": app_name,
                "handled": handled,
                "platform": "web",
                "type": from,
                "intent": intent,
                "sequence": index,
                "sender_id": session_id,
                "dialogue": msg,
                "meta_data": ""                
            }
            let saveConvReqJson = {
                method: "POST",
                uri: process.env.AGENTDESK_API + "/api/v1.0/snx/save-conversation",
                body: options,
                json: true
            }
            request(saveConvReqJson).then(result => {
                // console.log(result.message)
            }).catch(error => {
                // console.log("Error in saving conversation")
            })
        });
    },
    cignalsAnalytics: (rclient, from, handled, intent, msg, sessionId, botId, accessKey, platform, botType, callback) => {
        //let baseUrl = (botType == 'Live') ? process.env.LIVE_BASE_URL : process.env.SANDBOX_BASE_URL;
        let baseUrl ='https://api.cignals.ai';
        let senderId = sessionId;
        if (platform == 'whatsapp') {
            senderId = sessionId.split('-')[1];
        }
        var d = new Date();
        setTimeout(() => {
            let incr = rclient.incr(sessionId, (err, index) => {
                let options = {
                    message: {
                        "botId": botId,
                        "type": from,
                        "senderId": senderId,
                        "timestamp": d.toISOString(),
                        "message": msg,
                        "handled": handled,
                        "intent": intent || 'na',
                        "sessionId": sessionId,
                        "platform": platform
                    }
                };
                let saveConvReqJson = {
                    headers: {
                        'Content-Type': 'application/json',
                        'AccessKey': accessKey
                    },
                    method: "POST",
                    uri: baseUrl + "/api/v1/" + botId + "/message",
                    body: options,
                    json: true
                };

                request(saveConvReqJson).then(result => {
                    console.log("Cignals Api:", result.message)
                    callback(null, result);
                }).catch(error => {
                    console.log("Error in saving conversation in cignals", error.error)
                    callback(error, null);
                })
            })
        }, 500);
    }
}