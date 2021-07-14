require('mongoose-type-email');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

let botDetailsSChema = new Schema({
    botName: String,
    botColor: String,
    botTitle: String,
    botSubTitle: String,
    botIcon: String,
    botLogo: String,
    bodyBg: String,
    buttonsColor: String,
    menuFlag: String,
    tooltip: String,
    restartIcon: String,
    menuList: Array,
    getStarted: String,
    botType: String,
    dfJson: String,
    dfJsonFile : Object,
    getStartedText: String,
    botId: String,
    accessKey: String,
    userId : String
}, {
    timestamps: true
}, {
    versionKey: false
})

let otherBotsSchema = new Schema({
    botName: String,    
    dfJson: String,
    dfJsonFile : Object,    
    botId: String,
    accessKey: String,
    cigBotType: String,
    userId : String,
    botType : String
}, {
    timestamps: true
}, {
    versionKey: false
})

let sessionSchema = new Schema({
    slug: { type: Object },
    socketId: String
}, {
    timestamps: true
}, {
    versionKey: false
})

let usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_active: Boolean
}, {
    timestamps: true
}, {
    versionKey: false
})
let filesSchema = new Schema({
    botId: String,
    fileName: String,
    file: String, 
    fileId: String
})
let agentIdSchema = new Schema({
    agentId: String,
    orgId: String,
    botName: String,
    botId: String
})

let createBotModel = mongoose.model('bot-details', botDetailsSChema)
let usersModel = mongoose.model('users', usersSchema)
let fileUploadModel = mongoose.model('file-upload', filesSchema)
createBot = function (json, callback) {
    let botJson = new createBotModel(json);
    botJson.save((err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    })
}

let createOtherBotModel = mongoose.model('other-bot-details', otherBotsSchema)
createOtherBot = (json, callback) => {
    let botJson = new createOtherBotModel(json);
    botJson.save((err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    })
}

let agentIdModel = mongoose.model('agent-id', agentIdSchema)
saveAgentId = (json, callback) => {
    let agentId = new agentIdModel(json);
    agentId.save((err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    })
}

let loginAuthUser = function (email, password, callback) {
    usersModel.findOne({
        email: email,
        is_active: true
    }).exec((error, user) => {
        if (error) {
            return callback(error)
        } else if (!user) {
            var err = new Error('User not found!')
            err.status = 401;
            return callback(err);
        } else {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result === true) {
                    return callback(null, user)
                } else {
                    console.log("Error in comparing passwords", error)
                    return callback(error);
                }
            })
        }
    })
}

let createUser = function(user, callback) {
    let userCreation = new usersModel(user);
    userCreation.save((err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    })
}

let uploadFile = function(data, callback) {
    let fileUpload = new fileUploadModel(data);
    fileUpload.save((err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data)
        }
    })
}

module.exports = {
    createBot,
    loginAuthUser,
    createUser,    
    uploadFile,
    createOtherBot,
    saveAgentId,
    agentIdModel,
    usersSchema: mongoose.model('users', usersSchema),
    otherBotDetails : mongoose.model('other-bot-details', otherBotsSchema),
    botDetails: mongoose.model('bot-details', botDetailsSChema),
    sessions: mongoose.model('sessions', sessionSchema),
    userFile: mongoose.model('file-upload', filesSchema)
}