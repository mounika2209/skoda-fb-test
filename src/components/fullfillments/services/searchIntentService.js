const globalIntent = require('./globalIntentsService');
const textResponse = require('../skoda-responses/dialogues');
const responseBuildHelper = require('../../dialogflow/helpers/responseBuildHelper')
const contextHelper = require('../../dialogflow/helpers/contextHelper');
const skodaSession = require('../../customers/services/skodaSession');
const smallTalkIntent = require('./smallTalkIntent');
const skodaVariant = require('../../customers/services/skodaCars')
const skodaCars = require('../skoda-responses/skoda-cars');
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

module.exports = {

    interestedNewCar: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let responseCard = responseBuildHelper.fbIMages(skodaCars.skodaMenu);
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;
    },
    offerSale: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let responseCard = responseBuildHelper.quickReplyPayload(
            textResponse.skodaOffersales.text,
            textResponse.skodaOffersales.buttons

            );
        fulfillmentMessages.push(responseCard)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchOtherBrandInterest: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.OtherBrandInterest)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    foulWords: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.foulWords)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSaysOK: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.okResponse)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchRSAConnect: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageUrlsText(
            textResponse.rsaConnect.text,
            textResponse.rsaConnect.buttons
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    genericAgentAcquaintance: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.genericAgentRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    genericAgentCurrentnews: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.currentNewsRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchJobinskodaEvents: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.skodaJobsRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userCompareOtherBots: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.otherBotRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaDealership: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.dealershipRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaAccessories: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageUrlsText(
            textResponse.skodaAccessories.text,
            textResponse.skodaAccessories.buttons
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaAppAvailability: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.appavailabilityRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    appUserDetails: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageUrlsText(
            textResponse.appUserDetailsRsp.text,
            textResponse.appUserDetailsRsp.buttons
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaMaintenance: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let responseTxt = responseBuildHelper.messageText(textResponse.prefixskodaMaintanceRsp)
        fulfillmentMessages.push(responseTxt)
        let response = responseBuildHelper.messageUrlsText(
            textResponse.skodaMaintanceRsp.text,
            textResponse.skodaMaintanceRsp.buttons
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaRsaTermEnquiry: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.skodaRsaTermRsp)

        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaJobs: async (json) => {

        let outputContexts = json.queryResult.outputContexts;

        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.skodaJobRsp)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaBadservice: async (json) => {

        // let userName = json.queryResult.parameters.userCity;

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplyPayload(
            textResponse.skodaBadServiceRsp.text,
            textResponse.skodaBadServiceRsp.buttons
        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    offerDownPayment: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);

        client.set(sessionId + " -Type", 'sales', redis.print);

        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {

            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];
            let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
            let fulfillmentMessages = [];
            let responseTxt = responseBuildHelper.messageText(textResponse.offerDownPayPrefix)
            fulfillmentMessages.push(responseTxt)
            let response = responseBuildHelper.messageText(textResponse.userNumber)
            fulfillmentMessages.push(response)

            let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
            return responseJson;
        }
    },
    skodaFinance: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let contextNames = ['sessionstart', 'skodafinance-followup'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            textResponse.skodaCars.title,
            textResponse.skodaCars.quickReplies
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaFinanceTestDrive: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let carName = json.queryResult.parameters.skodaCars;

        client.set(sessionId, carName, redis.print);


        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplyPayload(
            `1.Get up to 90% finance\n2.Flexible repayment options\n3.Fast loan approval\n4.Innovative financing solutions\n5.Attractive and Competitive Rates\n6.Long tenure funding\n7.Bundled Products8.Customised loan products`,
            [
                {
                    "type": "postback",
                    "payload": "Test Drive for "+ carName,
                    "title": "Test Drive"
                }
            ]
        )
        console.log("==============", response)
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaExchange: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let contextNames = ['sessionstart', 'skodaexchange-followup'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            textResponse.skodaCars.title,
            textResponse.skodaCars.quickReplies
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaExchangeCallBack: async (json) => {


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
            textResponse.skodaExchangeRsp.text,
            textResponse.skodaExchangeRsp.buttons

        );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaFeatures: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let contextNames = ['sessionstart', 'skodafeatures-followup'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            textResponse.skodaCars.title,
            textResponse.skodaCars.quickReplies
        )
        fulfillmentMessages.push(response)

        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    skodaFeaturesBrochure: async (json) => {


        let carName = json.queryResult.parameters.skodaCars;


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        
    
        let response = (carName == 'Rapid') ? responseBuildHelper.quickReplyPayload(
            textResponse.rapidBrochure_1.text,
            textResponse.rapidBrochure_1.buttons
        ) : (carName == 'Superb') ? responseBuildHelper.quickReplyPayload(
            textResponse.superbBrochure_1.text,
            textResponse.superbBrochure_1.buttons
        ) : (carName == 'Octavia') ? responseBuildHelper.quickReplyPayload(
            textResponse.octaviaBrochure_1.text,
            textResponse.superbBrochure_1.buttons
        ) : (carName == 'Kushaq') ? responseBuildHelper.quickReplyPayload(
            textResponse.kushaqBrochure_1.text,
            textResponse.superbBrochure_1.buttons
        ) : responseBuildHelper.quickReplyPayload(
            textResponse.rapidBrochure_1.text,
            textResponse.superbBrochure_1.buttons
        );
        fulfillmentMessages.push(response);
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaDeliveryEnquiry: async (json) => {


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'skodadeliveryenquiry-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let responseTxt = responseBuildHelper.messageText(textResponse.skodaDeliveryEnq)
        fulfillmentMessages.push(responseTxt)
        let response = responseBuildHelper.quickReplies(
            textResponse.skodaFeaturesBrochureRsp.title,
            textResponse.skodaFeaturesBrochureRsp.quickReplies
        );
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaDeliveryEnquiryYes: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchdealerlocationtype-followup'];

        client.set(sessionId + " -Dealer", 'sales', redis.print);

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.skodaDealerLocation)
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaDeliveryEnquiryNo: async (json) => {


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplies(
            textResponse.haveCarIfAny.title,
            textResponse.haveCarIfAny.quickReplies
        );
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    sparePartsCost: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchdealerlocationtype-followup'];

        client.set(sessionId + " -Dealer", 'service', redis.print);

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = responseBuildHelper.messageText(textResponse.skodaSpareParts)
        fulfillmentMessages.push(response)
        let responseText = responseBuildHelper.messageText(textResponse.skodaDealerLocation)
        fulfillmentMessages.push(responseText)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaFeedback: async (json) => {


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'skodafeedback-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplies(
            textResponse.skodaFeedbackRsp.title,
            textResponse.skodaFeedbackRsp.quickReplies
        );
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaFeedbackUsrInfo: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);



        client.set(sessionId + " -Type", 'Feedback', redis.print);
        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let outputContexts = json.queryResult.outputContexts;
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];


            let response = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(response);
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        }


    },
    skodaFeedbackUsrInfoThxs: async (json) => {


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchcomplaintregistered-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let responseText = responseBuildHelper.messageText(textResponse.feedbackThxs)
        fulfillmentMessages.push(responseText)

        let response = responseBuildHelper.quickReplies(
            textResponse.haveCarIfAny.title,
            textResponse.haveCarIfAny.quickReplies
            );
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaSpareParts: async (json) => {


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'skodaspareparts-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplies(
            textResponse.skodaSparePartsRsp.title,
            textResponse.skodaSparePartsRsp.quickReplies
        );
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    skodaSparePartsYes: async (json) => { console.log("=========================")

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);



        client.set(sessionId + " -Type", 'Skoda_SpareParts', redis.print);
        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let outputContexts = json.queryResult.outputContexts;
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];


            let response = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(response);
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;

        }


    },
    skodaSparePartsYesThsRsp: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];


        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchcomplaintregistered-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let responsePrefix = responseBuildHelper.messageText(textResponse.sparePartsThxs);
        fulfillmentMessages.push(responsePrefix);

        let response = responseBuildHelper.quickReplies(
            textResponse.haveCarIfAny.title,
            textResponse.haveCarIfAny.quickReplies
        );
        fulfillmentMessages.push(response)
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
            textResponse.skodaRoofTopRsp.buttons,

        );
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    userSearchBudgetCar: async (json) => {
        let budgetOne = json.queryResult.parameters.userBudget
        let budgetTwo = json.queryResult.parametersuserBudget1
        let budgetType = json.queryResult.parameters.budgetType
        let outputContexts = json.queryResult.outputContexts;

        console.log("budgetOne", budgetOne)
        console.log("budgetTwo", budgetTwo)
        console.log("budgetType", budgetType)

        if ((!budgetOne) && (!budgetTwo)) {
            console.log('1111111')
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

        } else if (budgetType == 'between') {
            console.log('22222222222222')
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantBtw(budgetOne, budgetTwo);
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


        } else if (budgetType == 'exactly') {
            console.log("3333333")
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

        if (budgetOne > budgetTwo) {
            console.log('444444')
            if (!budgetTwo) {
                console.log('55555')
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

            } else {
                console.log('6666666666')
                let contextNames = ['sessionstart', 'usersearchtypo-followup'];
                let nextContext = await contextHelper.getOutputContext(
                    outputContexts,
                    contextNames
                );
                let skodaBudgetRsp = await skodaVariant.getSkodaVariantBudgetMany(budgetOne, budgetTwo);
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
        } else {
            console.log('77777777')
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let skodaBudgetRsp = await skodaVariant.getSkodaVariantBudgetBelow(budgetOne, budgetTwo);
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

}