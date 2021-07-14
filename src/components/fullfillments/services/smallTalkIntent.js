
const cons = require("consolidate");
const responseBuildHelper = require('../../dialogflow/helpers/responseBuildHelper')
const contextHelper = require('../../dialogflow/helpers/contextHelper');
const { json } = require("body-parser");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const textResponse = require('../skoda-responses/dialogues');
const skodaCars = require('../skoda-responses/skoda-cars');
var moment = require('moment');
const skodaSession = require('../../customers/services/skodaSession');
const dealerIntegration = require('../../integrations/dealer');

module.exports = {

    userSayNo: async(json) => {

        let outputContexts = json.queryResult.outputContexts;
    
        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.userSaysNo)
        fulfillmentMessages.push(response)
        
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSaysBye: async(json) => {

        let outputContexts = json.queryResult.outputContexts;
    
        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.userSaysBye)
        fulfillmentMessages.push(response)
        
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchTestDriveUsrEmailSkip: async (json) => {

        
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let category = await skodaSession.getCategory(sessionId + " -Type");
        let userInfo = json.queryResult.outputContexts[0].parameters;
        //client.del(sessionId);
         console.log("================", category)

         skodaSession.skodaUpdateInfo(sessionId, userInfo.userMobile, userInfo.userCity, userInfo.email || 'Skip');

        let outputContexts = json.queryResult.outputContexts;
        if (category == 'Testdrive') {
            let contextNames = ['sessionstart', 'usersearchtestdriveusremailskip-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.userTestDriveTimePrfix);
            fulfillmentMessages.push(responsePrefix);

            let response = textResponse.userTestDriveTime;
            fulfillmentMessages.push(response);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if (category == 'Brochure') {

            let contextNames = ['sessionstart'];

            let carName = await skodaSession.getCarName(sessionId);

            console.log("==============carName=========", carName)


            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.brochurePreText);
            fulfillmentMessages.push(responsePrefix);
            //let rsp = responseBuildHelper.video(textResponse.Rvideo); ======== video

            //let rsp = responseBuildHelper.downloadBrochure(textResponse.brochure);
            let response = (carName == 'Rapid') ? responseBuildHelper.downloadBrochure(
                textResponse.rapidBrochure
            ) : (carName == 'Superb') ? responseBuildHelper.downloadBrochure(
                textResponse.superbBrochure
            ) : (carName == 'Octavia') ? responseBuildHelper.downloadBrochure(
                textResponse.octaviaBrochure
            ) : (carName == 'Kushaq') ? responseBuildHelper.downloadBrochure(
                textResponse.kushaqBrochure
            ) : responseBuildHelper.downloadBrochure(
                textResponse.rapidBrochure
            );
            fulfillmentMessages.push(response);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;

        } else if(category == 'Complaint Registration') {
            let contextNames = ['sessionstart', 'usersayaboutcomplaint'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.complaintText);
            fulfillmentMessages.push(responsePrefix);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'sales') {
            let contextNames = ['sessionstart', 'usersayaboutcomplaint'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.salesCallback);
            fulfillmentMessages.push(responsePrefix);

            let response = textResponse.userTestDriveTime;
            fulfillmentMessages.push(response);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'service') {
            let contextNames = ['sessionstart', 'uservehicleno'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.serviceCallback);
            fulfillmentMessages.push(responsePrefix);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'Feedback') {
            let contextNames = ['sessionstart', 'skodafeedbackusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let response = responseBuildHelper.messageText(textResponse.feedbackIssueRsp);
            fulfillmentMessages.push(response);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'Skoda_SpareParts') {
            let contextNames = ['sessionstart', 'skodasparepartsyes-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let response = responseBuildHelper.messageText(textResponse.userSpareParts);
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'Issue') {
            let contextNames = ['sessionstart', 'usersearchcomplaintregistered-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responseText = responseBuildHelper.messageText(textResponse.issueRsp);
            fulfillmentMessages.push(responseText)
            let response = responseBuildHelper.quickReplies(
                textResponse.haveCarIfAny.title,
                textResponse.haveCarIfAny.quickReplies
            )
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'Call_Urgent')  {
            let contextNames = ['sessionstart', 'usersearchcomplaintregistered-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responseText = responseBuildHelper.messageText(textResponse.urgentCallRsp);
            fulfillmentMessages.push(responseText)
            let response = responseBuildHelper.quickReplies(
                textResponse.haveCarIfAny.title,
                textResponse.haveCarIfAny.quickReplies
            )
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        }


    },
}