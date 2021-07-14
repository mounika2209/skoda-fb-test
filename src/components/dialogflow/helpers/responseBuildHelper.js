const cons = require("consolidate");

module.exports = {
    messageText: (text) => {
        return {
            text: {
                text: [text]
            }
        }
    },
    fbIMages: (card) => {

        let carCard = '';
        let multipleCards = [];



        card.forEach((messages, index) => {
            console.log("+++++++++++", messages)
            console.log("+++++-------++++++", messages.buttons)

            let carCard = {

                title: messages.title,
                subtitle: messages.subtitle,
                image_url: messages.image_url,
                buttons: messages.buttons

            }
            multipleCards.push(carCard)

        })

        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: 'generic',
                            elements: multipleCards

                        }
                    }
                }
            }
        }
    },
    downloadBrochure: (url) => {
        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "file",
                        payload: url
                    }
                }
            }
        }

    },
    video: (qw) => {
        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "video",
                        payload: qw
                    }
                }
            }
        }
    },
    mobileText: (text) => {
        return {
            payload: {
                type: 'mobile-number',
                message: text
            }
        }

    },
    messageUrlText: (text, name, url) => {
        return {
            payload: {
                type: 'custom-button',
                message: text,
                buttons: [
                    {
                        name: name,
                        url: url
                    }
                ]
            }
        }

    },
    quickReplyPayload: (text, button) => {
        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: 'button',
                            text: text,
                            buttons: button

                        }
                    }
                }
            }
        }

    },
    messageCallback: (text, name, url) => {
        return {
            payload: {
                type: 'text-button',
                message: text,
                buttons: [
                    {
                        name: name,
                        url: url
                    }
                ]
            }
        }

    },
    messageUrlsText: (text, buttons) => {
        console.log("+++++++", text)
        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "button",
                            text: text,
                            buttons: buttons

                        }
                    }
                }
            }
        }

    },
    messageVideo: (url) => {
        return {
            payload: {
                facebook: {
                    attachment: {
                        type: "video",
                        payload: {
                            url: url
                        }
                    }
                }
            }
        }
    },
    quickReplies: (title, qr) => {
        return {
            quick_replies: {
                title: title,
                quick_replies: qr
            }
        }
    },

    /*  msgTextAndQuickReplies:(text,title,qr) => {
         return {
             [
                 text: {
                     text: [text]
                 }
             ],
             [
                 quick_replies: {
                     title: title,
                     quick_replies: qr
                 }
             ]
         }
 
     }, */
    cardGeneral: (message) => {
        return {
            payload: {
                type: 'cards-carousel',
                message: message
            }
        }
    },
    carouselGeneral: (message) => {
        return {
            payload: {
                type: 'carousel-general',
                message: message
            }
        }
    },
    budgetCarouselGeneral: (message) => {
        return {
            payload: {
                type: 'budget-carousel-general',
                message: message
            }
        }
    },

    kbArticles: (message) => {
        return {
            payload: {
                type: 'kb-articles-custom',
                message: message
            }
        }
    },

    dropDownList: (title, list) => {
        return {
            payload: {
                type: "dropdown-list",
                message: {
                    title: title,
                    list: list
                },
            }
        }
    },

    multipleSkodaCards: (message) => {

        message.forEach((messages, index) => {
            carCard = {
                card: {
                    title: messages.model_name.toUpperCase(),
                    imageUri: messages.image_url
                }
            }
            multipleCards.push(carCard)

        })

        return multipleCards


    },

    customType: (type) => {
        return {
            payload: {
                type: type
            }
        }
    },

    qrLinks: (buttons) => {
        return {
            payload: {
                type: 'custom-button',
                buttons: buttons
            }
        }
    },

    responseBuilder: (fulfillmentMessages, nextContext) => {
        return {
            fulfillmentText: 'Fulfillment Message',
            fulfillmentMessages: fulfillmentMessages,
            outputContexts: nextContext,
            source: "servicenext.ai"
        }
    },

    multipleResponseBuilder: (fulfillmentMessages, nextContext) => {
        return {
            fulfillmentText: 'This is a text response',
            fulfillmentMessages: fulfillmentMessages,
            outputContexts: nextContext,
            platform: "FACEBOOK",
            source: "servicenext.ai"
        }
    }

}