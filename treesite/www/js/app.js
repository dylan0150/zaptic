angular.module('app',[])

.controller('ctrl', function($scope, questions) {

    $scope.question = questions.get()["1"]
    $scope.results  = questions.getResults()

    $scope.$on("directive.qnode.change", function(event) {
        $scope.results = questions.getResults()
    })
})

.service('questions', function() {

    this.respones  = {}
    this.questions = {}
    this.results   = []

    this.get = function() {
        return this.questions
    }

    this.getResults = function() {
        return this.results.map(function(e) {
            return this.respones[e]
        })
    }

    this.getNextNode = function(question, answer_label) {
        if ( answer.next == "EOP" ) { return null }

        for ( var answer of question.choices ) {
            if ( answer.label == answer_label ) { break };
        }

        for ( var id of answer.add ) {
            if ( !this.results.includes(id) ) { this.results.push(id) }
        }
        for ( var id of answer.remove ) {
            this.results = this.results.filter(function(e){ return e != id })
        }

        return question[answer.next]
    }

    return this
})

.directive("qnode", function() {
    return {
        restrict: 'E',
        templateUrl: "/templates/qnode.html",
        scope: {
            question: "="
        },
        controller: function($scope, questions) {
            
            $scope.selectNode = function(answer) {
                answer.selected = true
                $scope.node = questions.getNextNode($scope.question, answer.label)
                $scope.$emit("directive.qnode.change", answer)
            }

        }
    }
})