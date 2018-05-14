const emprestimoSrv = angular.module("apacteca")

emprestimoSrv.service("Portaria", ['$http',
    function ($http) {

        this.getAll = (rg, dataInicio, dataFim) => {
            const request = {
                rg: rg,
                dataInicio: dataInicio,
                dataFim: dataFim
            }

            return $http.post(`http://localhost:8002/visit/getAll`, request)
        }

        this.create = (emprestimo) => {
            const request = {
                rg: emprestimo.rg,
                nome: emprestimo.nome,
                tipo: emprestimo.tipo,
                nomeRecuperando: emprestimo.nomeRecuperando,
                parentesco: emprestimo.parentesco
            }

            return $http.post(`http://localhost:8002/visit`, request)
        }

        this.getVisitantePorRgETipo = (emprestimo) => {
            return $http.get(`http://localhost:8002/visitor/${emprestimo.rg}/${emprestimo.tipo}`)
        }

        this.registrarSaida = (id) => {
            return $http.get(`http://localhost:8002/visit/setExiting/${id}`)
        }


    }
])