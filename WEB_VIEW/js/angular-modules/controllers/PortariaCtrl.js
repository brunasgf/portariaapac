const EmprestimoCtrl = angular.module('apacteca')

EmprestimoCtrl.controller('PortariaCtrl', ['$scope', 'Portaria', 'Notify', 'toastr',
    ($scope, Portaria, Notify, toastr) => {

        $scope.visita = {
            idVisita: null,
            nomeRecuperando: null,
            parentesco: null,
            idVisitante: null,
            horaEntrada: null,
            horaSaida: null
        }

        $scope.filter = {
            idVisita: null,
            nomeRecuperando: null,
            parentesco: null,
            idVisitante: null,
            horaEntrada: null,
            horaSaida: null
        }

        $scope.visitante = {
            idVisitante: null,
            nome: null,
            rg: null,
            tipo: null
        }

        $scope.listaVisitas = [];
        $scope.isDisabled = true;
        $scope.listaObra = [];

        const OpenModalNovaVisita = () => {
            return Notify.openModalTemplate("./views/portaria/criar.html")
                .closePromise
                .then(() => {
                    getTodasVisitas()
                })
                .catch(() => {
                    getTodasVisitas()
                })
        }

        const adicionarVisita = (emprestimo) => {
            return Emprestimo.create(emprestimo)
                .then((res) => {
                    toastr.success(res.data.message, "Tudo Certo")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Ops Algo de errado Aconteceu")
                })
        }


        const getTodasVisitas = () => {
            return Portaria.getAll($scope.filter)
                .then((res) => {
                    $scope.listaVisitas = res.data.data;
                    console.log(res);
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em vizualizar as visitas :(")
                })
        }

        const getFormatedData = (data) => {
            const date = new Date(parseInt(data));
            const msg = date.toLocaleString();
            if (msg == 'Invalid Date') {
                return '-';
            } else {
                return msg;
            }
        }

        $scope.OpenModalNovaVisita = OpenModalNovaVisita
        $scope.adicionarVisita = adicionarVisita
        $scope.getFormatedData = getFormatedData
        $scope.getTodasVisitas = getTodasVisitas


    }
])
