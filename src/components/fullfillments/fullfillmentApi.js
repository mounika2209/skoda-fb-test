
const cons = require('consolidate');
const router = require('express').Router();
const globalIntentHandler = require('../fullfillments/services/globalIntentHandler');
const skodaSession = require('../customers/services/skodaSession');

router.post('/:agentname/webhook', (req, res) => { 
    let json = req.body;
    let sessionSplit = json.session.split('/');
    let sessionId = sessionSplit[sessionSplit.length - 1];
    skodaSession.getOrCreateSkodaSession(sessionId);
    let botName = req.params.agentname;
    let intents = json.queryResult.intent.displayName;
    let intent = intents.replace(/[-+()\s]/g, '');

    console.log('Intent::', intent)
    let botNameSwitch = {
        skoda_web_test: async (intent, json, res) => { 
           
            return globalIntentHandler(intent, json, res)
        }

    }
    botNameSwitch[botName](intent, json, res);
});

router.get('/hello', (req, res) => {
    console.log("Hello");
});


module.exports = router;