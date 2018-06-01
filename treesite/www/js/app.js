angular.module('app',[])

.controller('ctrl', function($scope, questions) {
    $scope.question = questions.get()["1"]
    $scope.results  = []
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
        var results = []
        for ( var id of answer.add ) {
            if ( !results.includes(id) ) { results.push(id) }
        }
        for ( var id of answer.remove ) {
            var filtered_results = results.filter(function(e){ return e != id })
        }

        return {
            question: this.questions[answer.next],
            results : filtered_results
        }
    }

    return this
})

.directive("qnode", function() {
    return {
        restrict: 'E',
        templateUrl: "/templates/qnode.html",
        scope: {
            question: "=",
            results: "="
        },
        controller: function($scope, questions) {
            $scope.selectNode = function(answer) {
                answer.selected = true
                $scope.node     = questions.getNextNode($scope.question, answer.label)
            }
        }
    }
})

.filter('arrayToList', function() {

    return function(value, key) {
        var res = ""
        for ( var item of value ) {

            if ( res.length > 0 ) { res += ", " }
            
            if ( key == undefined ) {
                res += item.toString()
            } else {
                res += item[key].toString()
            }
        }
        return res
    }
})