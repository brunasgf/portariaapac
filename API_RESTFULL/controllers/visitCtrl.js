const Queries = require("./queriesCtrl")
const VisitCtrl = require("./visitorCtrl")
const Visitor = require("../models/visitor")
const Visit = require("../models/visit")
const Moment = require("moment")

class VisitController extends Queries {
    constructor() {
        super("visita", ['data_hora_entrada', 'recuperando_visitado', 'parentesco', "visitante_id_visitante"])
    }

    create(params) {
        const visitorCtrl = new VisitCtrl()
        return this.createConnectionSQL()
            .then(() => {
                return visitorCtrl.getByRg(params.rg)
            })
            .then((res) => {
                if (res && res.length) {
                    console.log(res)
                    return Promise.resolve(res[0].id_visitante)
                } else {
                    const visitor = new Visitor(params.nome, params.rg, params.tipo)
                    return visitor.validateParams()
                        .then((visitor) => {
                            if (visitor.tipo === "visitante") {
                                const visit = new Visit(params.parentesco, params.nomRecuperando)
                                return visit.validateVisitParams()
                            } else {
                                Promise.resolve()
                            }
                        })
                        .then(() => {
                            return visitorCtrl.create(params)
                        })
                        .then((res) => {
                            console.log(res)
                            return Promise.resolve(res.insertId)
                        })
                        .catch((err) => {
                            return Promise.reject(err)
                        })
                }
            })
            .then((idVisitante) => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            console.log(params)
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) 
                                            VALUES ('${Moment().format("YYYY-MM-DD HH:MM:SS")}',
                                                    ${(params.nomRecuperando) ? '"' + params.nomRecuperando + '"' : 'null'}, 
                                                    ${(params.parentesco) ? '"' + params.parentesco + '"' : 'null'},
                                                    ${idVisitante}) `

                            this.conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }

    setExiting(idVisit) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `UPDATE ${this.table} SET data_hora_saida = '${Moment().format("YYYY-MM-DD HH:mm:ss")}' WHERE id_visita = ${idVisit}`

                            this.conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(result)
                                }
                            })
                        }
                    })
                })
            })
            .then((res) => {
                this.conn.end()
                return Promise.resolve(res)
            })
            .catch((err) => {
                this.conn.end()
                return Promise.reject(err)
            })
    }
}

module.exports = VisitController