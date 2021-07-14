const models = require('.././models/model-schemas')


module.exports = (app, directory) => {

    app.get('/skoda-test', (req, res) => {
        res.render('home.html');
    });

    app.get('/bot/:botname/:botid', (req,res) => {

        res.render('index.html');
    })

    app.post('/bot/verify-widget', (req, res) => {

            let snxCookie = req.body.snx_cookie;
            if (snxCookie == 'undefined' || snxCookie == undefined) {
                return new models.sessions().save(function (err, record) {
                    if (err) return err;
                    else {
                        models.botDetails.findOne({
                            _id: req.body.botIdUi
                        }, (err, botDetails) => {
                            if (err) return err;
                            else {
                                res.status(200).json({
                                    isValid: true,
                                    sessionId: record._id,
                                    botDetails: botDetails
                                })
                            }
                        })
                    }
                })
            } else {
                return new models.sessions().save(function (err, record) {
                    if (err) return err;
                    else {
                        models.botDetails.findOne({
                            _id: req.body.botIdUi
                        }, (err, botDetails) => {
                            if (err) return err;
                            else {
                                res.status(200).json({
                                    isValid: true,
                                    sessionId: record._id,
                                    botDetails: botDetails
                                })
                            }
                        })
                    }
                })
            }

    })


}