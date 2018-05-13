const emprestimoSrv = angular.module("apacteca")

emprestimoSrv.service("Portaria", ['$http',
    function ($http) {

        this.getAll = (filter) => {
            const request = {
                idVisita: filter.idVisita,
                nomeRecuperando: filter.nomeRecuperando,
                parentesco: filter.parentesco,
                idVisitante: filter.idVisita,
                horaEntrada: filter.HoraEntrada
            }
            return $http.post(`http://localhost:8002/visit/getAll`, request)
        }

        this.create = (emprestimo) => {
            const request = {
                idVisita: filter.idVisita,
                nomeRecuperando: filter.nomeRecuperando,
                parentesco: filter.parentesco,
                idVisitante: filter.idVisita,
                horaEntrada: filter.HoraEntrada

            }

            return $http.post(`http://localhost:8001/borrow`, request)
        }

        
    }
])