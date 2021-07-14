const dialogflow = require("dialogflow");
const redis = require("redis");
const rclient = redis.createClient(process.env.REDIS_URL);
const fetchIntent = require("../helpers/intent-detector")
const request = require("request-promise");
const analytics = require("../helpers/analytics");
const PubNub = require("pubnub");
const fs = require('fs')
const models = require('../models/model-schemas')
const pubnub = new PubNub({
  publishKey: process.env.PUBLISH_KEY,
  subscribeKey: process.env.SUBSCRIBE_KEY,
  secretKey: process.env.SECRET_KEY
});
//const AWS = require('aws-sdk');


module.exports = io => {
  pubnub.addListener({
    message: function (m) {
      let msg = m.message; // The Payload
      let data = msg.data;
      let sessionId = data.session_id;
      let botName = data.bot_name;
      /* if (msg.userName) {
        rclient.hgetall(botName + "-" + sessionId, (err, replies) => {
          if (replies && replies.sessionId === sessionId) {
            return io.emit("from_snx_agent" + sessionId, msg);
          }
        });
      } */
      if (msg.msg == "chat_opened") {
        io.emit("from_snx_agent" + sessionId, msg);
      }
      if (msg.msg == "chat_closed") {
        rclient.hset(botName + "-" + sessionId, 'sessionId', sessionId, 'agentRoutingFlag', false)
        // rclient.del(botName + "-" + sessionId);
        io.emit("from_snx_agent" + sessionId, msg);
      } else if (msg.msg && msg.msg !== "chat_closed" && !msg.userName) {
        analytics.publishAnalytic(rclient, "agent", true, "", msg.msg, sessionId, botName);
        rclient.hgetall(botName + "-" + sessionId, (err, replies) => {
          if (replies && replies.sessionId === sessionId) {
            io.emit("from_snx_agent" + sessionId, msg);
          }
        });
      } else if (msg.isTyping || !msg.isTyping && !msg.msg) {
        io.emit("on_typing" + sessionId, msg.isTyping, msg.userName)
      }
    },
    presence: function (p) {
      // console.log("Presence:" + JSON.stringify(p))
    },
  });
  pubnub.subscribe({
    channels: ["from_agent", "on_typing"],
    withPresence: true,
  });
  io.on("connection", socket => {
    socket.emit("connection-response", {
      state: "Connection Success",
      socketId: socket.id,
    });

    socket.on("user_typing", data => {
      pubnub.publish({
          message: data,
          channel: "user_typing",
        },
        response => {
          // console.log("Published from user typing status");
        })
    })

    socket.on("from_widget", async data => { console.log("+++++++++++ from_widget")
      let sessionId = data.attributes.sender.session_id;
      console.log("Text Response :", data.message.payload);
      let text = data.message.payload.text;
      let botName = data.attributes.bot_name;
      let botUiId = data.attributes.bot_ui_id;
      let botId = data.attributes.bot_id;
      let accessKey = data.attributes.access_key;
      let userData = data;
      let userDetails = data.user_details;
      let dfJson = data.attributes.df_json;
      let botType = data.attributes.bot_type;
      let platform = data.attributes.platform;
      fetchIntent(botName, sessionId, rclient, text).then(result => {
          rclient.hgetall(botName + "-" + sessionId, async function (err, replies) {
            if (
              replies &&
              replies.sessionId === sessionId &&
              replies.agentRoutingFlag == 'true'
            ) {
              let intent = text;
              let options = {
                bot_id: botId,
              };
              request(requestJson)
                .then(result => {
                  let rules = result.data;
                  rules.forEach(item => {
                    item.rule_option.forEach(optn => {
                      if (optn == intent) {
                        let teamId = item.rule_team_id;
                        let inboxObj = {
                          bot_id: botId,
                          session_id: sessionId,
                          team_id: teamId,
                          bot_name: botName
                        };
                        request(teamInboxReqJson)
                          .then(teamsResult => {
                            let teams = teamsResult;
                            let agentStatusUpdateObj = {
                              bot_id: botId,
                              session_id: sessionId,
                              team_id: teamId,
                              agent_status: false,
                              bot_name: botName,
                              online: true,
                              user_details: userDetails
                            };
                            if (teams.length == 0) {
                              let options = {
                                method: "POST",
                                uri: process.env.AGENTDESK_API +
                                  "/api/v1.0/snx/team-inbox-add",
                                body: agentStatusUpdateObj,
                                json: true,
                              };
                              request(options)
                                .then(result => {
                                  // io.emit("team_inbox_incr", result);
                                  pubnub.publish({
                                      message: result,
                                      channel: "team_inbox_incr",
                                    },
                                    response => {
                                      // socket.emit("from_snx_df" + sessionId, {
                                      //   agentTransfer: true
                                      // });
                                      // console.log("Published from user for online status");
                                    }
                                  );
                                })
                                .catch(err => {
                                  console.log("Error in adding team inbox", err);
                                });
                            } else {
                              let agentStatusObj = {
                                bot_id: botId,
                                session_id: sessionId,
                                agent_status: true,
                                bot_name: botName
                              };
                              let agentStatusReqJson = {
                                method: "POST",
                                uri: process.env.AGENTDESK_API +
                                  "/api/v1.0/snx/team-inbox",
                                body: agentStatusObj,
                                json: true,
                              };
                              request(agentStatusReqJson)
                                .then(statusResult => {
                                  if (statusResult.length > 0) {
                                    if (statusResult[0].agent_status == true) {
                                      let options = {
                                        bot_id: botId,
                                        session_id: sessionId,
                                        agent_status: false,
                                        bot_name: botName,
                                        online: true,
                                      };
                                      let agentStatusUpdateJson = {
                                        method: "POST",
                                        uri: process.env.AGENTDESK_API +
                                          "/api/v1.0/snx/team-inbox-update",
                                        body: options,
                                        json: true,
                                      };
                                      request(agentStatusUpdateJson)
                                        .then(data => {
                                          pubnub.publish({
                                              message: data,
                                              channel: "team_inbox_incr",
                                            },
                                            response => {
                                              socket.emit("from_snx_df" + sessionId, {
                                                agentTransfer: true
                                              });
                                              // console.log("Published from user for online status");
                                            }
                                          );
                                          // io.emit("team_inbox_incr", data);
                                        })
                                        .catch(err => {
                                          console.log("Error in updating agent status", err);
                                        });
                                    }
                                  }
                                })
                                .catch(err => {
                                  console.log("Error in agent status set:" + err);
                                });
                            }
                          })
                          .catch(err => {
                            console.log("Error in fetching teams:" + err);
                          });
                      } else {
                        // io.emit("from_snx_agent" + sessionId, "No Agents Available");                                
                      }
                    })
                  });
                })
                .catch(err => {
                  console.log("Error in fetching rules:" + JSON.stringify(err));
                });
              if (text != 'agent-transfer' && text != 'initial')
                analytics.publishAnalytic(rclient, "user", true, intent, text, sessionId, botName);
              // io.emit("from_user", userData);
              pubnub.publish({
                  message: userData,
                  channel: "from_user",
                },
                response => {}
              );
            } else {
              if (text != "initial" && text != "agent-transfer") {
                analytics.publishAnalytic(rclient, "user", true, "", text, sessionId, botName);
              }
              // let cred = credHelper(botName);
              let cred;
              let context = [];
              rclient.hgetall("context -" + sessionId, async (err, replies) => {
                if (replies && replies.sessionId === sessionId) {
                  context = JSON.parse(replies.outputContext);
                }
              });

              models.botDetails.findOne({
                "_id": botUiId
              }, async (err, result) => {
                cred = result.dfJsonFile;
                let googleApplicationCredentials = {};
                googleApplicationCredentials.credentials = cred;
                const sessionClient = new dialogflow.SessionsClient(
                  googleApplicationCredentials
                );
                const sessionPath = await sessionClient.sessionPath(
                  cred.project_id,
                  sessionId
                );

                const request = {
                  session: sessionPath,
                  queryInput: {
                    text: {
                      text: text,
                      languageCode: "en-US",
                    },
                  },
                  queryParams: {
                    context: context,
                  }
                };

                try {
                  console.log("Detecting Intent...>>>>>>>>>");
                  const responses = await sessionClient.detectIntent(request);
                  rclient.del("context -" + sessionId);
                  rclient.hset("context -" + sessionId, 'sessionId', sessionId, 'outputContext', JSON.stringify(responses[0].queryResult.outputContexts))
                  const result = responses[0].queryResult;
                  let intent = responses[0].queryResult.intent.displayName;
                  console.log("Detected Intent :",intent);
                  let handled = intent.includes('Fallback') ? false : true;
                  if (accessKey) {
                    analytics.cignalsAnalytics(rclient, "user", handled, intent, text, sessionId, botId, accessKey, platform, botType, (err, resopnse) => {
                      recursion(result.fulfillmentMessages, 0);
                    })
                  }

                  function recursion(data, count) {
                    if (count > data.length) return;
                    if (data.length > 0 && data[count]) {
                      let msg;

                      let type = data[count].message;
                      console.log("Data Type::",type)
                      if (type == 'text' || type == 'quickReplies' || type == 'payload' || type == 'card') {
                        let qRString = '';
                        if (type == 'quickReplies') {
                          let quickReplies = data[count].quickReplies.quickReplies;
                          quickReplies.forEach((item, index) => {
                            let newIndex = ++index;
                            qRString += ' ' + newIndex + '.' + item;
                          })
                        }
                        msg = (type == 'text') ? data[count].text.text[0] : (type == 'quickReplies') ? data[count].quickReplies.title + qRString : '';
                        let mapLocationNames = '';
                        let textAddons = '';
                        let favProd = '';
                        let fieldValue;
                        let viewBasket = '';
                        let viewBasketButtons = '';

                        if (type == 'payload') {
                          fieldValue = data[count].payload.fields.type.stringValue;
                          if (fieldValue == 'maps' || fieldValue == 'image-carousel' || fieldValue == 'image-carousel-explore') {
                            let elements = data[count].payload.fields.message.listValue.values;
                            elements.forEach(item => {
                              mapLocationNames += item.structValue.fields.name.stringValue + ', ';
                            })
                            msg = mapLocationNames;
                          }else if(fieldValue == 'mobile-number' ){
                            msg = data[count].payload.fields.message.stringValue;
                          }else if(fieldValue == 'custom-button'){
                            let url = data[count].payload.fields.buttons.listValue.values[0].structValue.fields.url.stringValue;
                             msg = data[count].payload.fields.message.stringValue+ ' '+ url;
                          }
                          if (fieldValue == 'text-addons') {
                            let elements = data[count].payload.fields.message.listValue.values;
                            elements.forEach(item => {
                              let subElems = item.structValue.fields.options.listValue.values;
                              subElems.forEach(item => {
                                textAddons += item.structValue.fields.name.stringValue + ', ';
                              })
                            })
                            msg = textAddons
                          }
                          if (fieldValue == 'fav-carousel') {
                            let elements = data[count].payload.fields.message.listValue.values;
                            elements.forEach(item => {
                              let subElems = item.structValue.fields.products.listValue.values;
                              subElems.forEach(item => {
                                favProd += item.structValue.fields.name.stringValue + ', ';
                              })
                            })
                            msg = favProd
                          }
                          if (fieldValue == 'basket-carousel') {
                            let productButtons = data[count].payload.fields.product_buttons.listValue.values;
                            productButtons.forEach(item => {
                              viewBasketButtons += item.stringValue + ', ';
                            })
                            let basketButtons = data[count].payload.fields.basket_buttons.listValue.values;
                            basketButtons.forEach(item => {
                              viewBasketButtons += item.stringValue + ', ';
                            })
                            let elements = data[count].payload.fields.message.listValue.values;
                            elements.forEach(item => {
                              let subElems = item.structValue.fields.products.listValue.values;
                              subElems.forEach(item => {
                                viewBasket += item.structValue.fields.name.stringValue + ', ';
                              })
                            })
                            msg = viewBasket + viewBasketButtons;
                          }
                          if (fieldValue == 'nutrients-card') {
                            let btns = '';
                            let nutrientsButtons = data[count].payload.fields.fav_buttons.listValue.values;
                            nutrientsButtons.forEach(item => {
                              btns += item.stringValue;
                            })
                            msg = data[count].payload.fields.name.stringValue + '-' + btns;
                          }
                        }

                        let cardText;
                        if (type == 'card') {
                          cardText = data[count].card.title + '-' + data[count].card.imageUri;
                          let cardButtons = data[count].card.buttons;
                          cardButtons.forEach(item => {
                            cardText += ', ' + item.text;
                          })
                          msg = cardText;
                        }
                        analytics.cignalsAnalytics(rclient, "bot", handled, intent, msg, sessionId, botId, accessKey, platform, botType, function (err, response) {
                          recursion(data, ++count)
                        })
                      }
                    }

                  }
                  // result.fulfillmentMessages.forEach(item => {
                  //   if (item.message == "text") {
                  //     let msg = item.text.text;
                  //     if (msg[0] != "agent-transfer")
                  //       analytics.publishAnalytic(rclient, "bot", true, "", msg, sessionId, botName);
                  //   } else if (item.message == "quickReplies") {
                  //     let msg = item.quickReplies;
                  //     analytics.publishAnalytic(rclient, "bot", true, "", msg, sessionId, botName);
                  //   }
                  // });
                  socket.emit("from_snx_df" + sessionId, result.fulfillmentMessages);
                } catch (err) {
                  console.error("DialogFlow.sendTextMessageToDialogFlow ERROR:", err);
                  throw err;
                }
              })
              // fs.readFile(dfJson, 'utf8', async function (err, contents) {
              //   if (err) console.log("Error df json:", err)
              //   cred = JSON.parse(contents)

              // })
            }
          });
        })
        .catch(err => {});
    });
    socket.on("from_agent", (msg, data) => {
      let sessionId = data.session_id;
      let botName = data.bot_name;
      if (msg.msg == "chat_conversation_closed") {
        rclient.del(botName + "-" + sessionId);
        msg.msg = "Agent left the chat";
        io.emit("from_snx_agent" + sessionId, msg);
      } else {
        analytics.publishAnalytic(rclient, "agent", true, "", msg, sessionId, botName);
        rclient.hgetall(botName + "-" + sessionId, (err, replies) => {
          if (replies && replies.sessionId === sessionId) {
            io.emit("from_snx_agent" + sessionId, msg);
          }
        });
      }
    });
    socket.on("online_status", data => {
      let sessionId = data.attributes.sender.session_id;
      let botId = data.attributes.botId;
      let botName = data.attributes.bot_name;
      let visitorStatus = data.message.payload.text;
      rclient.hgetall(botName + "-" + sessionId, (err, replies) => {
        if (
          replies &&
          replies.sessionId === sessionId &&
          replies.agentRoutingFlag
        ) {
          let options = {
            bot_id: botId,
            session_id: sessionId,
            online: visitorStatus,
          };
          let agentStatusUpdateJson = {
            method: "POST",
            uri: process.env.AGENTDESK_API + "/api/v1.0/snx/visitor-status",
            body: options,
            json: true,
          };
          request(agentStatusUpdateJson)
            .then(data => {
              // io.emit("team_inbox_incr", data);
              pubnub.publish({
                  message: data,
                  channel: "team_inbox_incr",
                },
                response => {
                  // console.log("Published from user for online status");
                }
              );
            })
            .catch(err => {
              console.log("Error in updating agent status", err);
            });
          let myInboxAgentStatus = {
            method: "POST",
            uri: process.env.AGENTDESK_API +
              "/api/v1.0/snx/myinbox-visitor-status",
            body: options,
            json: true,
          };
          request(myInboxAgentStatus)
            .then(data => {
              // io.emit("my_inbox_visitor_status", data);
              pubnub.publish({
                  message: data,
                  channel: "my_inbox_visitor_status",
                },
                response => {
                  // console.log("Published from user for online status");
                }
              );
            })
            .catch(err => {
              console.log("Error in updating agent status", err);
            });
        }
      });
    });
  });
};