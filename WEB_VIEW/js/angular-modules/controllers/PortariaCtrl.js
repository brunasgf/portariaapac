const visitaCtrl = angular.module('apacteca')

visitaCtrl.controller('PortariaCtrl', ['$scope', 'Portaria', 'Notify', 'toastr',
    ($scope, Portaria, Notify, toastr) => {

        $scope.visita = {
            id: null,
            nomeRecuperando: null,
            parentesco: null,
            idVisitante: null,
            dataEntrada: null,
            dataSaida: null,
            rg: null,
            tipo: null,
            nome: null,
        }

        $scope.filter = {
            id: null,
            nomeRecuperando: null,
            parentesco: null,
            idVisitante: null,
            dataEntrada: null,
            dataSaida: null,
            rg: null,
            tipo: null,
            nome: null,
        }

        $scope.visitante = {
            idVisitante: null,
            nome: null,
            rg: null,
            tipo: null
        }

        $scope.hasSearched = false
        $scope.hasvalue = false

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

        const adicionarVisita = (visita) => {
            return Portaria.create(visita)
                .then((res) => {
                    toastr.success(res.data.message, "Tudo Certo")
                    $scope.closeThisDialog()
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Ops Algo de errado Aconteceu")
                })
        }

        const buscarVisitante = (visitante) => {
            $scope.visitante.nome = null
            $scope.hasSearched = false
            $scope.hasvalue = false
            return Portaria.getVisitantePorRgETipo(visitante)
                .then((res) => {
                    $scope.hasSearched = true
                    console.log(res)
                    if (res && res.data && res.data.data.length) {
                        $scope.visitante.nome = res.data.data[0].nome
                        $scope.hasvalue = false
                    } else {
                        $scope.hasvalue = true
                    }
                })
                .catch((err) => {
                    toastr.error(err.data.message, "Ops Algo de errado Aconteceu")
                })
        }

        const getTodasVisitas = () => {
            return Portaria.getAll($scope.filter)
                .then((res) => {
                    var aux = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].dataSaida == null) {
                           aux.push(res.data.data[i]);
                        }
                    }
                    $scope.listaVisitas = aux;
                    console.log(res);
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em vizualizar as visitas :(")
                })
        }

        const getHistoricoVisitas = () => {
            return Portaria.getAll($scope.filter)
                .then((res) => {
                    $scope.listaVisitas = res.data.data;
                    console.log(res);
                })
                .catch((err) => {
                    toastr.error("Algo de errado aconteceu", "Você pode ter problemas em vizualizar as visitas :(")
                })
        }

        const registrarSaida = (id) => {
            return Portaria.registrarSaida(id)
                .then((res) => {
                    console.log(res);
                    getTodasVisitas();
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
        $scope.buscarVisitante = buscarVisitante
        $scope.getFormatedData = getFormatedData
        $scope.getTodasVisitas = getTodasVisitas
        $scope.registrarSaida = registrarSaida
        $scope.getHistoricoVisitas = getHistoricoVisitas


    }
])
