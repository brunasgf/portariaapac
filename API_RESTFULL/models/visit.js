const Promise = require("bluebird")

class Visit {
    constructor(parentesco, nomRecuperando, idUsuario, idVisitante) {
        this.nomRecuperando = nomRecuperando
        this.idUsuario = idUsuario
        this.idVisitante = idVisitante
        this.parentesco = parentesco
        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateParams() {
        if (!this.idUsuario) {
            this.error.statusCode = 400
            this.error.message = "Erro com o seun login"
            return Promise.reject(this.error)
        } else if (typeof this.idUsuario !== 'number') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto na sua sessão"
            return Promise.reject(this.error)
        } else {
            return Promise.resolve(this)
        }
    }

    validateVisitParams() {
        if (this.idVisitante) {
            return this.visitor.getById(this.idVisitante)
                .then((res) => {
                    if (res && res.length) {
                        console.log(res)
                        if (res[0].tipo === 'visitante') {
                            if (!this.parentesco) {
                                this.error.statusCode = 400
                                this.error.message = "Para visitantes é necessário preencher o parentesco"
                                return Promise.reject(this.error)
                            } else if (!this.nomRecuperando) {
                                this.error.statusCode = 400
                                this.error.message = "Para visitantes é necessário preencher o nomRecuperando"
                                return Promise.reject(this.error)
                            } else if (typeof this.nomRecuperando !== 'string') {
                                this.error.statusCode = 400
                                this.error.message = "Há algo incorreto no nome do recuperando"
                                return Promise.reject(this.error)
                            } else if (typeof this.parentesco !== 'string') {
                                this.error.statusCode = 400
                                this.error.message = "Há algo incorreto no parentesco"
                                return Promise.reject(this.error)
                            } else {
                                return Promise.resolve(this)
                            }
                        } else {
                            return Promise.resolve(this)
                        }
                    }
                })
        } else {
            return Promise.resolve(this)
        }
    }
}

module.exports = Visit