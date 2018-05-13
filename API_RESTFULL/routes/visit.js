const VisitController = require('../controllers/visitCtrl')
const Visit = require('../models/visit')

class RouteVisit {
    constructor(app) {
        this.visitController = new VisitController()
        this.app = app

        this.app.route('/visit')
            .post((req, res) => {
                return this.visitController.create(req.body)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: null,
                            data: response
                        }
                        res.json(resp)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(err.statusCode)
                        const resp = {
                            sucess: false,
                            message: err.message,
                            data: null
                        }
                        res.json(resp)
                    })
            })
    }
}

module.exports = RouteVisit