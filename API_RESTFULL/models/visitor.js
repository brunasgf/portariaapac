const Promise = require("bluebird")

class Visitor {
    constructor(nome, rg, tipo) {
        this.nome = nome
        this.rg = rg
        this.tipo = tipo
        this.error = {
            statusCode: null,
            message: null
        }
    }

    validateParams() {
        if (!this.rg) {
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o rg"
            return Promise.reject(this.error)
        } else if (typeof this.rg !== 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no tipo do RG"
            return Promise.reject(this.error)
        } else if (!this.nome) {
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o nome"
            return Promise.reject(this.error)
        } else if (!this.tipo) {
            this.error.statusCode = 400
            this.error.message = "É necessário preencher o tipo"
            return Promise.reject(this.error)
        } else if (typeof this.nome !== 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no tipo de Nome"
            return Promise.reject(this.error)
        } else if (typeof this.tipo !== 'string') {
            this.error.statusCode = 400
            this.error.message = "Há algo incorreto no tipo do campo tipo"
            return Promise.reject(this.error)
        } else if (this.tipo !== 'funcionario' &&
            this.tipo !== 'fornecedor' &&
            this.tipo !== 'visitante') {
            this.error.statusCode = 400
            this.error.message = "O campo tipo só pode ter valor funcionario, fornecedor ou visitante"
            return Promise.reject(this.error)
        } else {
            return Promise.resolve(this)
        }
    }
}

module.exports = Visitor