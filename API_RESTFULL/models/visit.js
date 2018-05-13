const Promise = require("bluebird")

class Visit {
    constructor(parentesco, nomRecuperando) {
        this.parentesco = parentesco
        this.nomRecuperando = nomRecuperando

        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateVisitParams() {
        if (!this.parentesco) {
            this.error.statusCode = 400
            this.error.message = "Para visitantes é necessário preencher o parentesco"
            return Promise.reject(this.error)
        } else if (!this.nomRecuperando) {
            this.error.statusCode = 400
            this.error.message = "Para visitantes é necessário preencher o nomRecuperando"
            return Promise.reject(this.error)
        } else if (typeof this.nomRecuperando !== 'string') {
            thsis.error.statusCode = 400
            this.error.message = "Há algo incorreto no nome do recuperando"
            return Promise.reject(this.error)
        } else if (typeof this.parentesco !== 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no parentesco"
            return Promise.reject(this.error)
        } else {
            return Promise.resolve(this)
        }
    }
}

module.exports = Visit