const globalIntent = require('./globalIntentsService');
const searchIntent = require('./searchIntentService');
const smallTalk = require('./smallTalkIntent');
const textResponse = require('../skoda-responses/dialogues');
const responseBuildHelper = require('../../dialogflow/helpers/responseBuildHelper')
const contextHelper = require('../../dialogflow/helpers/contextHelper');
const skodaVariant = require('../../customers/services/skodaCars')
const skodaCars = require('../skoda-responses/skoda-cars');
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {

    skodaCustomercare: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaCustomercar.text,
            textResponse.skodaCustomercar.buttons


            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaRooftop: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaRoofTopRsp.text,
            textResponse.skodaRoofTopRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaQuotation: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaQuotationRsp.text,
            textResponse.skodaQuotationRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaVehicleIssue: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'service', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaVehicleIssueRsp.text,
            textResponse.skodaVehicleIssueRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaWarrantyInfo: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'service', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaWarrantyInfoRsp.text,
            textResponse.skodaWarrantyInfoRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaServiceEnquiry: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'service', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaServiceEnquiryRsp.text,
            textResponse.skodaServiceEnquiryRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaRecommend: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'service', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaRecommendRsp.text,
            textResponse.skodaRecommendRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaUsed: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaUsedRsp.text,
            textResponse.skodaUsedRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaSpecs: async (json) => {

        /*skoda-availability*/

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaSpecsRsp.text,
            textResponse.skodaSpecsRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaAvailability: async (json) => {

        /*skoda-availability*/

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaSpecsRsp.text,
            textResponse.skodaSpecsRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaNewarrivalEnquiry: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaNewarrivalEnryRsp.text,
            textResponse.skodaNewarrivalEnryRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaOnroadPrice: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaOnroadPriceRsp.text,
            textResponse.skodaOnroadPriceRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaMileage: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        client.set(sessionId + " -Type", 'sales', redis.print);


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaMileageRsp.text,
            textResponse.skodaMileageRsp.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
   
    userSearchBudgetCarAmount: async (json) => { 
        let budgetOne = json.queryResult.parameters.userBudget
        let budgetTwo = json.queryResult.parametersuserBudget1
        let budgetType = json.queryResult.parameters.budgetType
        let outputContexts = json.queryResult.outputContexts;

        console.log("budgetOne", budgetOne)
        console.log("budgetTwo", budgetTwo)
        console.log("budgetType", budgetType)

        if(!budgetType && budgetOne && !budgetType)
        {
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantExactly(budgetOne);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson
        }

        if ((!budgetOne) && (!budgetTwo)) { console.log('1111111')
            let contextNames = [
                'sessionstart', 'usersearchbudgetcar-followup'
            ];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let response = responseBuildHelper.messageText(
                textResponse.skodaBudget
            )
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson

        }

        if (budgetType == 'above') {
            console.log("==================+++++++=")
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );

            let skodaBudgetRsp = await skodaVariant.getSkodaVariantAbove(budgetOne);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
            fulfillmentMessages.push(response)
            //fulfillmentMessages = [].concat.apply([], fulfillmentMessages);
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;

        } else if(budgetType == 'between')
        { console.log('22222222222222')
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantBtw(budgetOne,budgetTwo);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson


        } else if(budgetType == 'exactly')
        { console.log("3333333")
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantExactly(budgetOne);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson
            

        }

        if (budgetOne > budgetTwo) { console.log('444444')
            if (!budgetTwo) { console.log('55555')
                let contextNames = ['sessionstart', 'usersearchtypo-followup'];
                let nextContext = await contextHelper.getOutputContext(
                    outputContexts,
                    contextNames
                );
                let skodaBudgetRsp = await skodaVariant.getSkodaVariantBudgetOne(
                    budgetOne
                );
                let fulfillmentMessages = [];
                let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
                fulfillmentMessages.push(responseTxt)
                let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
                fulfillmentMessages.push(response)
                let responseJson = responseBuildHelper.multipleResponseBuilder(
                    fulfillmentMessages,
                    nextContext
                );
                return responseJson

            } else { console.log('6666666666')
                let contextNames = ['sessionstart', 'usersearchtypo-followup'];
                let nextContext = await contextHelper.getOutputContext(
                    outputContexts,
                    contextNames
                );
                let skodaBudgetRsp = await skodaVariant.getSkodaVariantBudgetMany(budgetOne,budgetTwo);
                let fulfillmentMessages = [];
                let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
                fulfillmentMessages.push(responseTxt)
                let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
                fulfillmentMessages.push(response)
                let responseJson = responseBuildHelper.multipleResponseBuilder(
                    fulfillmentMessages,
                    nextContext
                );
                return responseJson

            }
        } else { console.log('77777777')
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantBudgetBelow(budgetOne,budgetTwo);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.skodaBudgetPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.budgetCarouselGeneral(skodaBudgetRsp);
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson
        }

    },
    skodaAddOffers : async (json) => {
        //return searchIntent.offerDownPayment(json);
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = []; 
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaAddOffers.text,
            textResponse.skodaAddOffers.buttons

            );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;
    },
    skodaSparePartsNo : async (json) => {
        return searchIntent.skodaDeliveryEnquiryNo(json);
    },
    skodaMoreInfo: async(json) => {
        return searchIntent.skodaRooftop(json);
    },
    userSelectIfYes: async(json) => {
        return searchIntent.interestedNewCar(json);
    },
    userSearchComplaintRegisteredYes: async(json) => {

        return globalIntent.initialMessageYes(json);
    },
    DefaultWelcomeIntent: async(json) =>{
        return globalIntent.initialMessage(json);
    },
    userSearchTestDriveUsrEmail: async(json) => {

        return smallTalk.userSearchTestDriveUsrEmailSkip(json);
    },
    userHaveCar: async(json) => {

        return globalIntent.initialMessageYes(json);
    },

}