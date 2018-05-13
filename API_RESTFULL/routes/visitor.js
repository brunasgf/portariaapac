const VisitorController = require('../controllers/visitorCtrl')
const Visitor = require('../models/visitor')

class RouteVisitor {
    constructor(app) {
        this.visitorController = new VisitorController()
        this.app = app

        this.app.route('/visitor/:rg')
            .get((req, res) => {
                return this.visitorController.getByRg(req.params.rg)
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
                    })
            })
    }
}

module.exports = RouteVisitor	