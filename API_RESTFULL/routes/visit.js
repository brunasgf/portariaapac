const VisitController = require('../controllers/visitCtrl')
const Visit = require('../models/visit')

class RouteVisit {
    constructor(app) {
        this.visitController = new VisitController()
        this.app = app

        this.app.route('/visit')
            .post((req, res) => {
                const visit = new Visit(req.body.parentesco, req.body.nomRecuperando, req.body.idUsuario)
                return visit.validateParams()
                    .then((res) => {
                        if (req.body.idVisitante) {

                        } else {

                        }
                    })
                    .then(() => {
                        return this.visitController.create(req.body)
                    })
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

module.exports = RouteVisit	