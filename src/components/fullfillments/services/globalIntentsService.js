const cons = require("consolidate");
const responseBuildHelper = require('../../dialogflow/helpers/responseBuildHelper')
const contextHelper = require('../../dialogflow/helpers/contextHelper');
const { json } = require("body-parser");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const textResponse = require('../skoda-responses/dialogues');
const skodaCars = require('../skoda-responses/skoda-cars');
var moment = require('moment');
const currentTime = moment().format('LT');
const skodaSession = require('../../customers/services/skodaSession');
const dealerIntegration = require('../../integrations/dealer');
const facebookIntegration = require('../../integrations/facebookApi');
const smallTalkIntent = require('./smallTalkIntent');
const getCurrentTime = (currentTime >= '6:00 AM' && currentTime < '12:00 PM') ? "Good Morning" : (currentTime >= '12:00 PM' && currentTime < '6:00 PM') ? "Good Afternoon" : "Good Evening";




module.exports = {

    DefaultFallbackIntent: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.defaultRsp)
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;

    },
    initialMessage: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let userId = json.originalDetectIntentRequest.payload.data.sender.id;
        let getUserName = await facebookIntegration.getUserDetails(userId);
        skodaSession.getOrCreateSkodaSession(sessionId);
        let contextNames = ['sessionstart', 'initialmessage-followup'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText("Hello " + getUserName + "!\n" + getCurrentTime + "!\nWelcome to ŠKODA support 🙏\nHope you're doing well 😊")
        fulfillmentMessages.push(response)
        let initialOptions = responseBuildHelper.quickReplies(
            textResponse.initialMessage.title,
            textResponse.initialMessage.quickReplies
        )
        fulfillmentMessages.push(initialOptions)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    initialMessageYes: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            textResponse.haveSkodaCar.title,
            textResponse.haveSkodaCar.quickReplies
        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchServiceBooking: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];
        let nextContext = await contextHelper.zeroOutputContext(outputContexts, contextNames);
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageUrlsText(
            textResponse.serviceBooking.text,
            textResponse.serviceBooking.buttons

        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)
        return responseJson;
    },
    userSearchTypo: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let carName = json.queryResult.parameters.skodaCars;

        client.set(sessionId, carName, redis.print);

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        console.log("skodaCars.rapid=================", skodaCars.rapid)
        let responseCard = (carName == 'Rapid') ? responseBuildHelper.fbIMages(skodaCars.rapid) : (carName == 'Superb') ? responseBuildHelper.fbIMages(skodaCars.superb) : (carName == 'Octavia') ? responseBuildHelper.fbIMages(skodaCars.octavia) : (carName == 'Kushaq') ? responseBuildHelper.fbIMages(skodaCars.kushaq) : responseBuildHelper.fbIMages(skodaCars.rapid);
        fulfillmentMessages.push(responseCard)
        //return fulfillmentMessages[0];
        let responseJson = responseBuildHelper.multipleResponseBuilder(fulfillmentMessages, nextContext)

        return responseJson;
        /*  let rsp = {
             "fulfillmentText": "Fulfillment Message",
             "fulfillmentMessages": [
                 {
                     payload: {
                         template_type: "google_maps",
                         elements: [{
                             title: "&#352;KODA Auto",
                             image_url: "https://skoda-auto-india.s3.ap-south-1.amazonaws.com/rapid/rapid/Skoda-Rapid-Hero.png",
                             subtitle: "Mahatma Gandhi Road, Rasoolpura, Hyderabad",
                             price_range: [8, 18.9],
                             car_name: "rapid",
                             buttons: [{
                               type: "web_url",
                               url: "http://maps.google.com/maps?q=17.4466618,78.4872422",
                               title: ["Colors", "Test Drive", "Brochure"],
                               id: ["color1", "test_drive_btn", "brochure1"],
                               model: ["", "rapid", ""],
                               //"colors": ["jhjhk"]
                             }]
                           }
                         ]
                       }
                 }
             ],
             "outputContexts": nextContext,
             "source": "servicenext.ai"
         } */

        /*  let rsp = {
             "fulfillmentText": "This is a text response",
             "fulfillmentMessages": [
                 {
                     "text": {
                         "text": ["Thank you for contacting IT Help Desk. I am Alice, your IT virtual assistant."]
                     }
                 },
                 {
                     "payload": {
                         "type": 'image',
                         "message": "https://skoda-auto-india.s3.ap-south-1.amazonaws.com/rapid/rapid/Skoda-Rapid-Hero.png",
                         "buttons": ["Colors", "Test Drive", "Brochure"]
                     }
                 }
             ],
             "outputContexts" : nextContext
 
         } */

        /*  let rsp = {
             "fulfillmentText": "This is a text response",
             "fulfillmentMessages": [
                 {
                     "text": {
                         "text": ["Thank you for contacting IT Help Desk. I am Alice, your IT virtual assistant."]
                     }
                 },
                 {
                     "payload": {
                         "type": 'carousel-general',
                         "message": [
                             {
                             'id' : 9876,
                             'title' : '',
                             "image":"/assets/images/rapid-hero-img.png",
                             "buttons": ["Colors", "Test Drive", "Brochure"]
                             },
                             {
                                 'id' : 9876,
                                 'title' : '',
                                 "image":"/assets/images/rapid-hero-img.png",
                                 "buttons": ["Colors", "Test Drive", "Brochure"]
                             }      
                         ]
                     }
                 }
             ],
             "outputContexts" : nextContext
 
         }
         
     
         return rsp; */

    },
    userSearchTypocolorCar: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let checkUsrName = json.queryResult.parameters; console.log("checkUsrName.skodaCars::::::::::", checkUsrName.skodaCars)

        //let carName = await (!checkUsrName.skodaCars) ? skodaSession.getCarName(sessionId) : client.set(sessionId, checkUsrName.skodaCars,redis.print);
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];


        if (!checkUsrName.skodaCars) {
            let carName = await skodaSession.getCarName(sessionId);
            let responseCard = (carName == 'Rapid') ? responseBuildHelper.fbIMages(skodaCars.rapidColors) : (carName == 'Superb') ? responseBuildHelper.fbIMages(skodaCars.superbColors) : (carName == 'Octavia') ? responseBuildHelper.fbIMages(skodaCars.octaviaColors) : (carName == 'Kushaq') ? responseBuildHelper.fbIMages(skodaCars.kushaqColors) : responseBuildHelper.fbIMages(skodaCars.rapidColors);
            fulfillmentMessages.push(responseCard)
            let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

            return responseJson;
        } else {
            client.set(sessionId, checkUsrName.skodaCars, redis.print);
            let carName = checkUsrName.skodaCars
            let responseCard = (carName == 'Rapid') ? responseBuildHelper.fbIMages(skodaCars.rapidColors) : (carName == 'Superb') ? responseBuildHelper.fbIMages(skodaCars.superbColors) : (carName == 'Octavia') ? responseBuildHelper.fbIMages(skodaCars.octaviaColors) : (carName == 'Kushaq') ? responseBuildHelper.fbIMages(skodaCars.kushaqColors) : responseBuildHelper.fbIMages(skodaCars.rapidColors);
            fulfillmentMessages.push(responseCard)
            let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

            return responseJson;
        }

    },
    userSearchTypoTestDrive: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let category = json.queryResult.parameters.category;
        let carName = json.queryResult.parameters;
        let skodaUser = await skodaSession.getSkodaUser(sessionId);

        client.set(sessionId + " -Type", category, redis.print);
        if (carName.skodaCars) {
            client.set(sessionId, carName.skodaCars, redis.print);
        }
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        if (category == 'Testdrive') {
            if (skodaUser.info_status == "true") {
                return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

            } else {

                let responsePrefix = responseBuildHelper.messageText(textResponse.prefixUsrNameTestDrive);
                fulfillmentMessages.push(responsePrefix);
                let responseUsrInfo = responseBuildHelper.messageText(textResponse.prefixUsrInfo);
                fulfillmentMessages.push(responseUsrInfo);
                let response = responseBuildHelper.messageText(textResponse.userNumber);
                fulfillmentMessages.push(response);

            }

        } else if (category == 'Brochure') {
            if (skodaUser.info_status == "true") {
                return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

            } else {
                let response = responseBuildHelper.messageText(textResponse.userNumber);
                fulfillmentMessages.push(response);
            }
        }
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchTypoTestDriveUsrInfo: async (json) => {

        let userName = json.queryResult.parameters.userName;

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(`Thank you ` + userName + `, we will also need your 10 digit mobile number.`);
        fulfillmentMessages.push(response);
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchTestDriveUsrMobile: async (json) => {

        let userName = json.queryResult.parameters.userName;

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtestdriveusrmobile-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.userCity);
        fulfillmentMessages.push(response);
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchTestDriveUsrCity: async (json) => {

        let userName = json.queryResult.parameters.userCity;

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtestdriveusrcity-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            textResponse.userEmail.title,
            textResponse.userEmail.quickReplies
        )
        fulfillmentMessages.push(response);
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    /*  userSearchTestDriveUsrEmailSkip: async (json) => {
 
         
         let sessionSplit = json.session.split('/');
         let sessionId = sessionSplit[sessionSplit.length - 1];
         let category = await skodaSession.getCategory(sessionId + " -Type");
         let userInfo = json.queryResult.outputContexts[0].parameters;
         client.del(sessionId);
          console.log("================", category)
 
          skodaSession.skodaUpdateInfo(sessionId, userInfo.userName, userInfo.userMobile, userInfo.userCity, userInfo.email || 'Skip');
 
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
             let response = (carName == 'Rapid') ? responseBuildHelper.messageUrlText(
                 textResponse.rapidBrochure.title,
                 textResponse.rapidBrochure.name,
                 textResponse.rapidBrochure.url
             ) : (carName == 'Superb') ? responseBuildHelper.messageUrlText(
                 textResponse.superbBrochure.title,
                 textResponse.superbBrochure.name,
                 textResponse.superbBrochure.url
             ) : (carName == 'Octavia') ? responseBuildHelper.messageUrlText(
                 textResponse.octaviaBrochure.title,
                 textResponse.octaviaBrochure.name,
                 textResponse.octaviaBrochure.url
             ) : (carName == 'Kushaq') ? responseBuildHelper.messageUrlText(
                 textResponse.kushaqBrochure.title,
                 textResponse.kushaqBrochure.name,
                 textResponse.kushaqBrochure.url
             ) : responseBuildHelper.messageUrlText(
                 textResponse.rapidBrochure.title,
                 textResponse.rapidBrochure.name,
                 textResponse.rapidBrochure.url
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
         } else if(category == 'sales') { console.log("))))))))))))))))")
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
             let contextNames = ['sessionstart', 'usersayaboutcomplaint', 'uservehicleno'];
 
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
             let contextNames = ['sessionstart'];
 
             let nextContext = await contextHelper.zeroOutputContext(
                 outputContexts,
                 contextNames
             );
             let fulfillmentMessages = [];
             let responsePrefix = responseBuildHelper.messageText(textResponse.feedbackThxs);
             fulfillmentMessages.push(responsePrefix);
 
             let response = responseBuildHelper.quickReplies(
                 textResponse.haveCarIfAny.title,
                 textResponse.haveCarIfAny.quickReplies
                 );
             fulfillmentMessages.push(response)
 
             let responseJson = responseBuildHelper.multipleResponseBuilder(
                 fulfillmentMessages,
                 nextContext
             );
             return responseJson;
         } else if(category == 'Skoda_SpareParts') {
             let contextNames = ['sessionstart'];
 
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
 
             let responseJson = responseBuildHelper.multipleResponseBuilder(
                 fulfillmentMessages,
                 nextContext
             );
             return responseJson;
         }
 
 
     }, */
    /* userSearchTestDriveUsrEmail: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let category = await skodaSession.getCategory(sessionId + " -Type");
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

            let response = (carName == 'Rapid') ? responseBuildHelper.messageUrlText(
                textResponse.rapidBrochure.title,
                textResponse.rapidBrochure.name,
                textResponse.rapidBrochure.url
            ) : (carName == 'Superb') ? responseBuildHelper.messageUrlText(
                textResponse.superbBrochure.title,
                textResponse.superbBrochure.name,
                textResponse.superbBrochure.url
            ) : (carName == 'Octavia') ? responseBuildHelper.messageUrlText(
                textResponse.octaviaBrochure.title,
                textResponse.octaviaBrochure.name,
                textResponse.octaviaBrochure.url
            ) : (carName == 'Kushaq') ? responseBuildHelper.messageUrlText(
                textResponse.kushaqBrochure.title,
                textResponse.kushaqBrochure.name,
                textResponse.kushaqBrochure.url
            ) : responseBuildHelper.messageUrlText(
                textResponse.rapidBrochure.title,
                textResponse.rapidBrochure.name,
                textResponse.rapidBrochure.url
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
            let contextNames = ['sessionstart', 'usersayaboutcomplaint', 'uservehicleno'];

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
            let contextNames = ['sessionstart'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let responsePrefix = responseBuildHelper.messageText(textResponse.feedbackThxs);
            fulfillmentMessages.push(responsePrefix);

            let response = responseBuildHelper.quickReplies(
                textResponse.haveCarIfAny.title,
                textResponse.haveCarIfAny.quickReplies
                );
            fulfillmentMessages.push(response)

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        } else if(category == 'Skoda_SpareParts') {
            let contextNames = ['sessionstart'];

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

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        }


    }, */
    userSearchTestDriveUsrInfoAdded: async (json) => {

        // let userName = json.queryResult.parameters.userCity;

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'ifyes'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let responsePrefix = responseBuildHelper.messageText(textResponse.userTestDriveInfoAdded);
        fulfillmentMessages.push(responsePrefix);

        let response = responseBuildHelper.quickReplies(
            textResponse.ifAny.title,
            textResponse.ifAny.quickReplies
        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
   /*  userSearchTypoBrochure: async (json) => {

        let outputContexts = json.queryResult.outputContexts;
        let brochure = json.queryResult.parameters.brochure || '';
        client.set(sessionId + " -Type", brochure, redis.print);
        let contextNames = ['sessionstart', 'usersearchtypotestdrive-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.messageText(textResponse.userName);
        fulfillmentMessages.push(response);
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    }, */
    initialMessageNo: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'usersearchtypo-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let responsePrefixOne = responseBuildHelper.messageText(textResponse.pretextCarCarouselOne);
        fulfillmentMessages.push(responsePrefixOne);
        let responsePrefixTwo = responseBuildHelper.messageText(textResponse.pretextCarCarouselTwo);
        fulfillmentMessages.push(responsePrefixTwo);
        let responseCard = responseBuildHelper.fbIMages(skodaCars.skodaMenu);
        fulfillmentMessages.push(responseCard)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;
    },
    userSearchMenu: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];

        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart', 'initialmessage-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];
        let response = responseBuildHelper.quickReplies(
            'May I know if you own a ŠKODA?',
            textResponse.initialMessage.quickReplies
        )
        //let responseCard = responseBuildHelper.carouselGeneral(skodaCars.skodaMenu);
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;
    },
    userSearchBrochure: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1]; 
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let carName = json.queryResult.parameters; console.log("carName.skodaCars", carName.skodaCars)
        if (carName.skodaCars) {
            if (skodaUser.info_status == "true") {
                console.log("carName.skodaCars:::;", carName.skodaCars)
                client.set(sessionId, carName.skodaCars, redis.print);

                client.set(sessionId + " -Type", 'Brochure', redis.print);

                return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);
            } else {
                console.log("carName.skodaCars:::;", carName.skodaCars)
                client.set(sessionId, carName.skodaCars, redis.print);

                client.set(sessionId + " -Type", 'Brochure', redis.print);
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


        } else {
            let outputContexts = json.queryResult.outputContexts;
            let contextNames = ['sessionstart', 'usersearchtypo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];


            let response = responseBuildHelper.fbIMages(skodaCars.skodaMenu);
            fulfillmentMessages.push(response);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;

        }

    },
    userSearchTestDrive: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let carName = json.queryResult.parameters; console.log("carName.skodaCars", carName.skodaCars)
        let outputContexts = json.queryResult.outputContexts;
        let fulfillmentMessages = [];

        if (carName.skodaCars) {
            if (skodaUser.info_status == "true") {
                console.log("carName.skodaCars:::;", carName.skodaCars)
                client.set(sessionId, carName.skodaCars, redis.print);

                client.set(sessionId + " -Type", 'Testdrive', redis.print);

                return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);



            } else {
                console.log("carName.skodaCars:::;", carName.skodaCars)
                client.set(sessionId, carName.skodaCars, redis.print);

                client.set(sessionId + " -Type", 'Testdrive', redis.print);

                let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

                let nextContext = await contextHelper.zeroOutputContext(
                    outputContexts,
                    contextNames
                );


                let responsePrefix = responseBuildHelper.messageText(textResponse.prefixUsrNameTestDrive);
                fulfillmentMessages.push(responsePrefix);
                let responseUsrInfo = responseBuildHelper.messageText(textResponse.prefixUsrInfo);
                fulfillmentMessages.push(responseUsrInfo);
                let response = responseBuildHelper.messageText(textResponse.userNumber);
                fulfillmentMessages.push(response);
                let responseJson = responseBuildHelper.multipleResponseBuilder(
                    fulfillmentMessages,
                    nextContext
                );
                return responseJson;

            }


        } else {

            let contextNames = ['sessionstart', 'usersearchtypo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let response = responseBuildHelper.fbIMages(skodaCars.skodaMenu);
            fulfillmentMessages.push(response);
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;


        }
    },
    userSearchCarColor: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let carName = json.queryResult.parameters; console.log("carName.skodaCars", carName.skodaCars)
        let outputContexts = json.queryResult.outputContexts;
        let fulfillmentMessages = [];

        if (carName.skodaCars) {
            console.log("carName.skodaCars:::;", carName.skodaCars)
            client.set(sessionId, carName.skodaCars, redis.print);

            let contextNames = ['sessionstart', 'usersearchtypo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );


            let responseCard = (carName.skodaCars == 'Rapid') ? responseBuildHelper.fbIMages(skodaCars.rapidColors) : (carName.skodaCars == 'Superb') ? responseBuildHelper.fbIMages(skodaCars.superbColors) : (carName.skodaCars == 'Octavia') ? responseBuildHelper.fbIMages(skodaCars.octaviaColors) : (carName.skodaCars == 'Kushaq') ? responseBuildHelper.fbIMages(skodaCars.kushaqColors) : responseBuildHelper.fbIMages(skodaCars.rapidColors);
            fulfillmentMessages.push(responseCard)
            let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

            return responseJson;


        } else {

            let contextNames = ['sessionstart', 'usersearchtypo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let response = responseBuildHelper.fbIMages(skodaCars.skodaMenu);
            fulfillmentMessages.push(response);
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;


        }
    },
    userSearchVideo: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let carName = json.queryResult.parameters.skodaCars;

        //let carName = await (!checkUsrName.skodaCars) ? skodaSession.getCarName(sessionId) : client.set(sessionId, checkUsrName.skodaCars,redis.print);
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];

        let response = (carName == 'Rapid') ? responseBuildHelper.messageVideo(
            textResponse.rapidVideo.url
        ) : (carName == 'Superb') ? responseBuildHelper.messageVideo(
            textResponse.superbVideo.url
        ) : (carName == 'Octavia') ? responseBuildHelper.messageVideo(
            textResponse.octaviaVideo.url
        ) : (carName == 'Kushaq') ? responseBuildHelper.messageUrlsText(
            textResponse.kushaqVideo.text,
            textResponse.kushaqVideo.buttons
        ) : responseBuildHelper.messageUrlsText(
            textResponse.rapidVideo.text,
            textResponse.rapidVideo.buttons
        );

       /*  let response = (carName == 'Rapid') ? responseBuildHelper.messageUrlsText(
            textResponse.rapidVideo.text,
            textResponse.rapidVideo.buttons
        ) : (carName == 'Superb') ? responseBuildHelper.messageUrlsText(
            textResponse.superbVideo.text,
            textResponse.superbVideo.buttons
        ) : (carName == 'Octavia') ? responseBuildHelper.messageUrlsText(
            textResponse.octaviaVideo.text,
            textResponse.octaviaVideo.buttons
        ) : (carName == 'Kushaq') ? responseBuildHelper.messageUrlsText(
            textResponse.kushaqVideo.text,
            textResponse.kushaqVideo.buttons
        ) : responseBuildHelper.messageUrlsText(
            textResponse.rapidVideo.text,
            textResponse.rapidVideo.buttons
        ); */

        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    userSearchOnlineBooking: async (json) => {
        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let carName = json.queryResult.parameters.skodaCars;

        //let carName = await (!checkUsrName.skodaCars) ? skodaSession.getCarName(sessionId) : client.set(sessionId, checkUsrName.skodaCars,redis.print);
        let outputContexts = json.queryResult.outputContexts;
        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );
        let fulfillmentMessages = [];



        let response = (carName == 'Rapid') ? responseBuildHelper.messageUrlsText(
            textResponse.rapidOnlineBooking.text,
            textResponse.rapidOnlineBooking.buttons
        ) : (carName == 'Superb') ? responseBuildHelper.messageUrlsText(
            textResponse.superbOnlineBooking.text,
            textResponse.superbOnlineBooking.buttons
        ) : (carName == 'Octavia') ? responseBuildHelper.messageUrlsText(
            textResponse.octaviaOnlineBooking.text,
            textResponse.octaviaOnlineBooking.buttons
        ) : (carName == 'Kushaq') ? responseBuildHelper.messageUrlsText(
            textResponse.kushaqOnlineBooking.text,
            textResponse.kushaqOnlineBooking.buttons
        ) : responseBuildHelper.messageUrlsText(
            textResponse.skodaOnlineBooking.text,
            textResponse.skodaOnlineBooking.buttons
        );

        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)

        return responseJson;

    },
    userSearchComplaintRegister: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let outputContexts = json.queryResult.outputContexts;



        client.set(sessionId + " -Type", 'Complaint Registration', redis.print);

        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let fulfillmentMessages = [];


            let responsePrefix = responseBuildHelper.messageText(textResponse.prefixComplaintRegiser);
            fulfillmentMessages.push(responsePrefix);
            let responseUsrInfo = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(responseUsrInfo);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );

            return responseJson;

        }

    },
    userIssue: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let outputContexts = json.queryResult.outputContexts;



        client.set(sessionId + " -Type", 'Issue', redis.print);

        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let fulfillmentMessages = [];

            let responseUsrInfo = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(responseUsrInfo);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );

            return responseJson;

        }

    },
    callUrgent: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let outputContexts = json.queryResult.outputContexts;



        client.set(sessionId + " -Type", 'Call_Urgent', redis.print);

        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let fulfillmentMessages = [];

            let response = responseBuildHelper.messageText(textResponse.urgentCallPrefix);
            fulfillmentMessages.push(response);

            let responseUsrInfo = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(responseUsrInfo);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );

            return responseJson;

        }

    },
    userSearchComplaintRegistered: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;
        let category = await skodaSession.getCategory(sessionId + " -Type");

        let contextNames = ['sessionstart', 'usersearchcomplaintregistered-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );

        let fulfillmentMessages = [];


        let responsePrefix = category == 'Complaint Registration' ? responseBuildHelper.messageText(textResponse.complaintRegistered) : responseBuildHelper.messageText(textResponse.callBackThxRsp);
        fulfillmentMessages.push(responsePrefix);

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

    },
    userSearchSalesCallback: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let categoryType = json.queryResult.parameters.sales || 'sales';
        let outputContexts = json.queryResult.outputContexts;



        client.set(sessionId + " -Type", categoryType, redis.print);
        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {
            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let fulfillmentMessages = [];


            let responsePrefix = responseBuildHelper.messageText(textResponse.prefixSales);
            fulfillmentMessages.push(responsePrefix);
            let responseUsrInfo = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(responseUsrInfo);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;

        }

    },
    userSearchServiceCallback: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let skodaUser = await skodaSession.getSkodaUser(sessionId);
        let categoryType = json.queryResult.parameters.service || 'service';
        let outputContexts = json.queryResult.outputContexts;

        client.set(sessionId + " -Type", categoryType, redis.print);

        if (skodaUser.info_status == "true") {

            return smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);

        } else {

            let contextNames = ['sessionstart', 'usersearchtypotestdriveusrinfo-followup'];

            let nextContext = await contextHelper.zeroOutputContext(
                outputContexts,
                contextNames
            );

            let fulfillmentMessages = [];


            let responsePrefix = responseBuildHelper.messageText(textResponse.prefixSales);
            fulfillmentMessages.push(responsePrefix);
            let responseUsrInfo = responseBuildHelper.messageText(textResponse.userNumber);
            fulfillmentMessages.push(responseUsrInfo);

            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            );
            return responseJson;
        }

    },
    userServiceVehicleNo: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let categoryType = json.queryResult.parameters.service;
        let outputContexts = json.queryResult.outputContexts;



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

    },
    userSearchArrangeCallback: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;


        let contextNames = ['sessionstart'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );

        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplies(
            textResponse.arrangeCallback.title,
            textResponse.arrangeCallback.quickReplies
        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchDealerLocation: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;


        let contextNames = ['sessionstart', 'usersearchdealerlocation-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );

        let fulfillmentMessages = [];

        let response = responseBuildHelper.quickReplies(
            textResponse.dealerLocation.title,
            textResponse.dealerLocation.quickReplies
        )
        fulfillmentMessages.push(response)
        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchDealerLocationType: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let outputContexts = json.queryResult.outputContexts;
        let dealerType = json.queryResult.parameters.dealerlocation;

        client.set(sessionId + " -Dealer", dealerType, redis.print);


        let contextNames = ['sessionstart', 'usersearchdealerlocationtype-followup'];

        let nextContext = await contextHelper.zeroOutputContext(
            outputContexts,
            contextNames
        );

        let fulfillmentMessages = [];

        let responsePrefix = responseBuildHelper.messageText(textResponse.usrPinoce);
        fulfillmentMessages.push(responsePrefix);

        let responseJson = responseBuildHelper.multipleResponseBuilder(
            fulfillmentMessages,
            nextContext
        );
        return responseJson;

    },
    userSearchDealerLocationPincode: async (json) => {

        let sessionSplit = json.session.split('/');
        let sessionId = sessionSplit[sessionSplit.length - 1];
        let dealerTyp = await skodaSession.getCarName(sessionId + " -Dealer");

        console.log(">>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", dealerTyp)

        let dealerPincode = json.queryResult.parameters.dealerPincode
        let outputContexts = json.queryResult.outputContexts;
        let dealerType = dealerTyp.toLowerCase()
        let dealerStatus = await dealerIntegration.dealerApi(
            dealerPincode,
            dealerType
        );
        let dealerStatusSplit = json.session.split('/');
        let title = dealerStatusSplit[dealerStatusSplit.length - 1];

        let value = [];




        if (!dealerStatus[0]) {
            let contextNames = [
                'sessionstart',
                'salescallback',
                'userselectarrangecallback'
            ];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            let response = responseBuildHelper.messageText(
                textResponse.locationNotFoundMsg
            )
            fulfillmentMessages.push(response)
            let responseJson = responseBuildHelper.multipleResponseBuilder(
                fulfillmentMessages,
                nextContext
            )
            return responseJson;

        } else {
            console.log("else==========")

            let contextNames = ['sessionstart'];
            let nextContext = await contextHelper.getOutputContext(
                outputContexts,
                contextNames
            );
            let fulfillmentMessages = [];
            dealerStatus.forEach(dealerLocation => {
                console.log("dealer-location", dealerLocation);
                let rsp = {
                    'title': dealerLocation.dealer_name,
                    'subtitle': 'Address: ' + dealerLocation.address + 'Contact: ' + dealerLocation.contact_no + ' Email:' + dealerLocation.email,
                    'image_url': 'https://skoda-live.servicenext.ai/images/dealer_bg.png',
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": "https://www.google.com/search?q=" + dealerLocation.dealer_name,
                            "title": "Contact Details"
                        }
                    ]
                }
                value.push(rsp);
            })

            let rsp = {
                "fulfillmentText": "This is a text response",
                "fulfillmentMessages": [
                    {
                        "payload": {
                            "facebook": {
                                "attachment": {
                                    "type": "template",
                                    "payload": {
                                        "template_type": "generic",
                                        "elements": value
                                    }

                                }
                            }
                        }
                    }
                ],
                "outputContexts": nextContext

            }
            // return rsp;
            let responseCard = responseBuildHelper.fbIMages(value);
            fulfillmentMessages.push(responseCard)
            console.log("fulfillmentMessages::", fulfillmentMessages)
            let responseJson = responseBuildHelper.responseBuilder(fulfillmentMessages, nextContext)


            return responseJson;

        }


    },



}