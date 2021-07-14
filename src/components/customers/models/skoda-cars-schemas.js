const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let skodaCarsSchema = new Schema({
    app_id: String,
    model_name: String,
    min_price: Number,
    max_price: Number,
    image_url: String
}, {
    timestamps: true
}, {
    versionKey: false
})

module.exports = {
    skodaCarsDetails: mongoose.model('skodacars', skodaCarsSchema)
}