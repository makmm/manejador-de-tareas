app.directive('compararA', function() {
    return {
        require: "ngModel",
        scope: {
            valorDeElOtroModel: "=compararA"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compararA = function(modelValue) {
                return modelValue == scope.valorDeElOtroModel;
            };

            scope.$watch("valorDeElOtroModel", function() {
                ngModel.$validate()
            })
        }
    }
})
