app.controller('addStudentController', ['$scope', 'studentDataService', function ($scope, studentDataService) {
  $scope.student = {};

  studentDataService.getAllStudents()
  .then(function (students) {
    $scope.allStudents = students.data.data;
  });

  $scope.student = [];

  $scope.addStudent = function () {
    studentDataService.addStudent($scope.student);
    $scope.student = {};
  };

}]);