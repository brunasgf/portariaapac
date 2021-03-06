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
                return visitorCtrl.getByRgAndType(params.rg, params.tipo)
            })
            .then((res) => {
                if (res && res.length) {
                    return Promise.resolve(res[0].id_visitante)
                } else {
                    const visitor = new Visitor(params.nome, params.rg, params.tipo)
                    return visitor.validateParams()
                        .then((visitor) => {
                            if (visitor.tipo === "visitante") {
                                const visit = new Visit(params.parentesco, params.nomeRecuperando)
                                return visit.validateVisitParams()
                            } else {
                                Promise.resolve()
                            }
                        })
                        .then(() => {
                            return visitorCtrl.create(params)
                        })
                        .then((res) => {
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
                            const sql = `INSERT INTO ${this.table} (${this.strColumns}) 
                                            VALUES ('${Moment().format("YYYY-MM-DD HH:MM:ss")}',
                                                    ${(params.tipo === "visitante") ? '"' + params.nomeRecuperando + '"' : 'null'}, 
                                                    ${(params.tipo === "visitante") ? '"' + params.parentesco + '"' : 'null'},
                                                    ${idVisitante}) `
                            console.log(sql)
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
                            console.log(sql)
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

    getFilterQuery(params) {
        let query = []
        let resp = ""
        let keys = Object.keys(params)
        if (keys.length) {
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === 'dataInicio' && params[keys[i]]) {
                    query.push(`data_hora_entrada >= '${params[keys[i]]}'`)
                } else if (keys[i] === 'dataFim' && params[keys[i]]) {
                    query.push(`data_hora_entrada <= '${params[keys[i]]}'`)
                } else if (keys[i] === 'rg' && params[keys[i]]) {
                    query.push(`rg LIKE '%${params[keys[i]]}%'`)
                }
            }

            if (query.length) {
                resp = `WHERE ${query.join(" AND ")} `
            }
        }
        return resp
    }

    getAllFiltered(params) {
        return this.createConnectionSQL()
            .then(() => {
                return new Promise((resolve, reject) => {
                    this.conn.connect((err) => {
                        if (err) {
                            reject(err)
                        } else {
                            const sql = `
                            SELECT
                                id_visita 'id',
                                DATE_FORMAT(data_hora_entrada, "%d/%m/%Y %H:%m") 'dataEntrada',
                                DATE_FORMAT(data_hora_saida, "%d/%m/%Y %H:%m") 'dataSaida',
                                recuperando_visitado 'nomeRecuperando',
                                parentesco,
                                visitante_id_visitante 'idVisitante',
                                nome,
                                rg,
                                tipo
                            FROM  visita as vis
                            join visitante as visit on vis.visitante_id_visitante = visit.id_visitante
                            ${this.getFilterQuery(params)}`
                            console.log(sql)
                            this.conn.query(sql, (err, result, fields) => {
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