const VisitorController = require('../controllers/visitorCtrl')
const Visitor = require('../models/visitor')

class RouteVisitor {
    constructor(app) {
        this.visitorController = new VisitorController()
        this.app = app

        this.app.route('/visitor/:rg/:tipo')
            .get((req, res) => {
                return this.visitorController.getByRgAndType(req.params.rg, req.params.tipo)
                    .then(response => {
                        res.status(200)
                        const resp = {
                            sucess: true,
                            message: null,
                            data: response
                        }
                        res.json(resp)
                    })
            })
    }
}

module.exports = RouteVisitor	