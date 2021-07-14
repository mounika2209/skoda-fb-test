module.exports = (botName, sessionId, rclient, text) => {
    return new Promise((resolve, reject) => {
        if (text == 'agent-transfer') {
            rclient.hset(botName + "-" + sessionId, 'sessionId', sessionId, 'agentRoutingFlag', true)            
        }
        resolve('success')
    }).catch(err => {
        console.log("Error in agent-transfer intent:" + err)
        reject(err)
    })

}