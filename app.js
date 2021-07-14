require('dotenv').config();
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const routes = require("./routes/routes.js");
const port = process.env.PORT || '3001';
const path = require('path');
const engines = require('consolidate');
const socketio = require('socket.io')()
const socketEvent = require("./sockets/socket-events")
const fullfillment = require('./src/components/fullfillments/fullfillmentApi')
let server = http.createServer(app).listen(port, () => {
	console.log("listening on port: " + port);
})
const io = socketio.listen(server)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true
})
mongoose.set('useFindAndModify', false);
app.use(function(req, res, next) {
	req.userip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, authtoken, contentType, Content-Type, authorization, accessKey'
	);
	next();
});
// app.use(bodyParser.json({limit:'50mb'})); app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use('/api/v1', fullfillment);

// app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', engines.mustache);
app.set('view engine', 'html');
// app.use(cors());
io.origins('*:*')
app.use('/', express.static(__dirname + '/'));


routes(app, __dirname);
socketEvent(io)
