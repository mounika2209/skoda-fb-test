const globalIntentsService = require('./globalIntentsService');
const searchIntentsService = require('./searchIntentService');
const arrangeCallBackIntent = require('./arrangeCallBackIntent');
const smallTalkIntent = require('./smallTalkIntent');
module.exports = (intent,json,res) => {
    console.log("Intent:", intent)
    

    let intentsSwitch = {


        initialMessage: async (json, res) => { 
            let responseJson = await globalIntentsService.initialMessage(json);
            return res.send(responseJson)
        },
        DefaultFallbackIntent: async(json,res) => {
            let responseJson = await globalIntentsService.DefaultFallbackIntent(json);
            return res.send(responseJson)
        },
        initialMessageYes: async(json,res) => {
            let responseJson = await globalIntentsService.initialMessageYes(json);
            return res.send(responseJson)
        },
        userSearchServiceBooking: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchServiceBooking(json);
            return res.send(responseJson)
        },
        userSearchTypo: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTypo(json);
            return res.send(responseJson)
        },
        userSearchTypocolorCar: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTypocolorCar(json);
            return res.send(responseJson)
        },
        userSearchTypoTestDrive: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTypoTestDrive(json);
            return res.send(responseJson)
        },
        userSearchTypoTestDriveUsrInfo: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTypoTestDriveUsrInfo(json);
            return res.send(responseJson)
        },
        userSearchTestDriveUsrMobile: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTestDriveUsrMobile(json);
            return res.send(responseJson)
        },
        userSearchTestDriveUsrCity: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTestDriveUsrCity(json);
            return res.send(responseJson)
        },
        userSearchTestDriveUsrInfoAdded: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTestDriveUsrInfoAdded(json);
            return res.send(responseJson)
        },
        userSearchTypoBrochure: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTypoBrochure(json);
            return res.send(responseJson)
        },
        initialMessageNo: async(json,res) => {
            let responseJson = await globalIntentsService.initialMessageNo(json);
            return res.send(responseJson)
        },
        userSearchMenu: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchMenu(json);
            return res.send(responseJson)
        },
        userSearchBrochure: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchBrochure(json);
            return res.send(responseJson)
        },
        userSearchTestDrive: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchTestDrive(json);
            return res.send(responseJson)
        },
        userSearchCarColor: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchCarColor(json);
            return res.send(responseJson)
        },
        userSearchVideo: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchVideo(json);
            return res.send(responseJson)
        },
        userSearchOnlineBooking: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchOnlineBooking(json);
            return res.send(responseJson)
        },
        userIssue: async(json,res) => {
            let responseJson = await globalIntentsService.userIssue(json);
            return res.send(responseJson)
        },
        callUrgent: async(json,res) => {
            let responseJson = await globalIntentsService.callUrgent(json);
            return res.send(responseJson)
        },
        userSearchComplaintRegister: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchComplaintRegister(json);
            return res.send(responseJson)
        },
        userSearchComplaintRegistered: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchComplaintRegistered(json);
            return res.send(responseJson)
        },
        userSearchSalesCallback: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchSalesCallback(json);
            return res.send(responseJson)
        },
        userSearchServiceCallback: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchServiceCallback(json);
            return res.send(responseJson)
        },
        userServiceVehicleNo: async(json,res) => {
            let responseJson = await globalIntentsService.userServiceVehicleNo(json);
            return res.send(responseJson)
        },
        userSearchArrangeCallback: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchArrangeCallback(json);
            return res.send(responseJson)
        },
        userSearchDealerLocation: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchDealerLocation(json);
            return res.send(responseJson)
        },
        userSearchDealerLocationType: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchDealerLocationType(json);
            return res.send(responseJson)
        },
        userSearchDealerLocationPincode: async(json,res) => {
            let responseJson = await globalIntentsService.userSearchDealerLocationPincode(json);
            return res.send(responseJson)
        },
        interestedNewCar: async(json,res) => {
            let responseJson = await searchIntentsService.interestedNewCar(json);
            return res.send(responseJson)
        },
        offerSale: async(json,res) => {
            let responseJson = await searchIntentsService.offerSale(json);
            return res.send(responseJson)
        },
        userSearchOtherBrandInterest: async(json,res) => {
            let responseJson = await searchIntentsService.userSearchOtherBrandInterest(json);
            return res.send(responseJson)
        },
        foulWords: async(json,res) => {
            let responseJson = await searchIntentsService.foulWords(json);
            return res.send(responseJson)
        },
        userSaysOK: async(json,res) => {
            let responseJson = await searchIntentsService.userSaysOK(json);
            return res.send(responseJson)
        },
        userSearchRSAConnect: async(json,res) => {
            let responseJson = await searchIntentsService.userSearchRSAConnect(json);
            return res.send(responseJson)
        },
        genericAgentAcquaintance: async(json,res) => {
            let responseJson = await searchIntentsService.genericAgentAcquaintance(json);
            return res.send(responseJson)
        },
        genericAgentCurrentnews: async(json,res) => {
            let responseJson = await searchIntentsService.genericAgentCurrentnews(json);
            return res.send(responseJson)
        },
        userSearchJobinskodaEvents: async(json,res) => {
            let responseJson = await searchIntentsService.userSearchJobinskodaEvents(json);
            return res.send(responseJson)
        },
        userCompareOtherBots: async(json,res) => {
            let responseJson = await searchIntentsService.userCompareOtherBots(json);
            return res.send(responseJson)
        },
        skodaDealership: async(json,res) => {
            let responseJson = await searchIntentsService.skodaDealership(json);
            return res.send(responseJson)
        },
        skodaAccessories: async(json,res) => {
            let responseJson = await searchIntentsService.skodaAccessories(json);
            return res.send(responseJson)
        },
        skodaAppAvailability: async(json,res) => {
            let responseJson = await searchIntentsService.skodaAppAvailability(json);
            return res.send(responseJson)
        },
        appUserDetails: async(json,res) => {
            let responseJson = await searchIntentsService.appUserDetails(json);
            return res.send(responseJson)
        },
        skodaMaintenance: async(json,res) => {
            let responseJson = await searchIntentsService.skodaMaintenance(json);
            return res.send(responseJson)
        },
        skodaRsaTermEnquiry: async(json,res) => {
            let responseJson = await searchIntentsService.skodaRsaTermEnquiry(json);
            return res.send(responseJson)
        },
        skodaJobs: async(json,res) => {
            let responseJson = await searchIntentsService.skodaJobs(json);
            return res.send(responseJson)
        },
        skodaBadservice: async(json,res) => {
            let responseJson = await searchIntentsService.skodaBadservice(json);
            return res.send(responseJson)
        },
        offerDownPayment: async(json,res) => {
            let responseJson = await searchIntentsService.offerDownPayment(json);
            return res.send(responseJson)
        },
        skodaFinance: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFinance(json);
            return res.send(responseJson)
        },
        skodaFinanceTestDrive: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFinanceTestDrive(json);
            return res.send(responseJson)
        },
        skodaExchange: async(json,res) => {
            let responseJson = await searchIntentsService.skodaExchange(json);
            return res.send(responseJson)
        },
        skodaExchangeCallBack: async(json,res) => {
            let responseJson = await searchIntentsService.skodaExchangeCallBack(json);
            return res.send(responseJson)
        },
        skodaFeatures: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFeatures(json);
            return res.send(responseJson)
        },
        skodaFeaturesBrochure: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFeaturesBrochure(json);
            return res.send(responseJson)
        },
        skodaDeliveryEnquiry: async(json,res) => {
            let responseJson = await searchIntentsService.skodaDeliveryEnquiry(json);
            return res.send(responseJson)
        },
        skodaDeliveryEnquiryYes: async(json,res) => {
            let responseJson = await searchIntentsService.skodaDeliveryEnquiryYes(json);
            return res.send(responseJson)
        },
        skodaDeliveryEnquiryNo: async(json,res) => {
            let responseJson = await searchIntentsService.skodaDeliveryEnquiryNo(json);
            return res.send(responseJson)
        },
        sparePartsCost: async(json,res) => {
            let responseJson = await searchIntentsService.sparePartsCost(json);
            return res.send(responseJson)
        },
        skodaFeedback: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFeedback(json);
            return res.send(responseJson)
        },
        skodaFeedbackUsrInfo: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFeedbackUsrInfo(json);
            return res.send(responseJson)
        },
        skodaFeedbackUsrInfoThxs: async(json,res) => {
            let responseJson = await searchIntentsService.skodaFeedbackUsrInfoThxs(json);
            return res.send(responseJson)
        },
        skodaSpareParts: async(json,res) => {
            let responseJson = await searchIntentsService.skodaSpareParts(json);
            return res.send(responseJson)
        },
        skodaSparePartsYes: async(json,res) => {
            let responseJson = await searchIntentsService.skodaSparePartsYes(json);
            return res.send(responseJson)
        },
        skodaRooftop: async(json,res) => {
            let responseJson = await searchIntentsService.skodaRooftop(json);
            return res.send(responseJson)
        },
        skodaSparePartsYesThsRsp: async(json,res) => {
            let responseJson = await searchIntentsService.skodaSparePartsYesThsRsp(json);
            return res.send(responseJson)
        },
        userSearchBudgetCar: async(json,res) => {
            let responseJson = await searchIntentsService.userSearchBudgetCar(json);
            return res.send(responseJson)
        },
        skodaCustomercare: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaCustomercare(json);
            return res.send(responseJson)
        },
        skodaQuotation: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaQuotation(json);
            return res.send(responseJson)
        },
        skodaAddOffers: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaAddOffers(json);
            return res.send(responseJson)
        },
        skodaVehicleIssue: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaVehicleIssue(json);
            return res.send(responseJson)
        },
        skodaWarrantyInfo: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaWarrantyInfo(json);
            return res.send(responseJson)
        },
        skodaServiceEnquiry: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaServiceEnquiry(json);
            return res.send(responseJson)
        },
        skodaRecommend: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaRecommend(json);
            return res.send(responseJson)
        },
        skodaUsed: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaUsed(json);
            return res.send(responseJson)
        },
        skodaSpecs: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaSpecs(json);
            return res.send(responseJson)
        },
        skodaAvailability: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaAvailability(json);
            return res.send(responseJson)
        },
        skodaNewarrivalEnquiry: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaNewarrivalEnquiry(json);
            return res.send(responseJson)
        },
        skodaOnroadPrice: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaOnroadPrice(json);
            return res.send(responseJson)
        },
        skodaMileage: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaMileage(json);
            return res.send(responseJson)
        },
        skodaSparePartsNo: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaSparePartsNo(json);
            return res.send(responseJson)
        },
        skodaMoreInfo: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.skodaMoreInfo(json);
            return res.send(responseJson)
        },
        userSearchBudgetCarAmount: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.userSearchBudgetCarAmount(json);
            return res.send(responseJson)
        },
        userSearchComplaintRegisteredYes: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.userSearchComplaintRegisteredYes(json);
            return res.send(responseJson)
        },
        userSelectIfYes: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.userSelectIfYes(json);
            return res.send(responseJson)
        },
        userSearchTestDriveUsrEmail: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.userSearchTestDriveUsrEmail(json);
            return res.send(responseJson)
        },
        userHaveCar: async(json,res) => {
            let responseJson = await arrangeCallBackIntent.userHaveCar(json);
            return res.send(responseJson)
        },
        DefaultWelcomeIntent: async(json, res) => {
            let responseJson = await arrangeCallBackIntent.DefaultWelcomeIntent(json);
            return res.send(responseJson)
        },
        userSayNo: async(json,res) => {
            let responseJson = await smallTalkIntent.userSayNo(json);
            return res.send(responseJson)
        },
        userSaysBye: async(json,res) => {
            let responseJson = await smallTalkIntent.userSaysBye(json);
            return res.send(responseJson)
        },
        userSearchTestDriveUsrEmailSkip: async(json,res) => {
            let responseJson = await smallTalkIntent.userSearchTestDriveUsrEmailSkip(json);
            return res.send(responseJson)
        },

    }
    intentsSwitch[intent](json, res);
}