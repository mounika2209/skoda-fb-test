const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let skodaSessionSchema = new Schema({
    app_id:String,
    session_id: String,
    info_status: String,
    own_skoda: String,
    platform: String,
    mobile_number: String,
    user_name: String,
    user_email: String,
    user_city: String
}, {
    timestamps: true
}, {
    versionKey: false
})

module.exports = {
    skodaSessionDetails: mongoose.model('skoda_session_fb', skodaSessionSchema)
}