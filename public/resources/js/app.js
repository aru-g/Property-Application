
var app = angular.module('products', []);

app.controller('productCTRL', function ($scope, $http) {
    
    $scope.loader = {
        loading: false
    };

    // Clear form values
    $scope.clearForm = function () {
       $scope._id = "";
		$scope.checkboxvalue1="";
		$scope.checkboxvalue2="";
		$scope.radiobuttonvalue="";
    };
    
    // Hide Form fields 
    $scope.hideFormFields = function () {
        $('#form-dinminder').hide();
    };
    
    // Show Form fields 
    $scope.showFormFields = function () {
        $('#form-dinminder').show();
    };

    //Read all entries
    $scope.getAllreg = function () {
        
        $scope.loader.loading = true;
        
        $http.get("properties/listreg")
            .success(function (response) {
                if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no added accounts.";
					$scope.loader.loading = false;
				} else {
					$scope.user=response.user;
					$scope.names = response.owner;
					$scope.forsale=response.status;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.statustext = "There was an error fetching data, please check database connection.";
            });
    };

    //Read all entries
    $scope.getAll = function () {
        
        $scope.loader.loading = true;
        
        $http.get("properties/list")
            .success(function (response) {
                if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no added accounts.";
					$scope.loader.loading = false;
				} else {
					$scope.names = response.owner;
					$scope.forsale1=response.status1;
					$scope.forsale2=response.status2;
					$scope.user=response.user;
				$scope.details=response.details;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.statustext = "There was an error fetching data, please check database connection.";
            });
    };
	
		  // Read product by ID
    $scope.readOne = function (_id) {

        // get id 
        $http.get('properties/711/' + _id,{
			'_id':$scope._id
		})
            .success(function (data, status, headers, config) {
            
$scope.getDetails();

                $scope.loader.loading = false;
            })
            .error(function (data, status, headers, config) {
                //Turn of spinner & display error
                $scope.loader.loading = false;
                $scope.modalstatustext = "There was an error fetching data";
            });
    };
	    $scope.updateStatus = function () {
        
        $scope.loader.loading = true;
        
        $http.put('/properties/update', {
            '_id' : $scope._id,
            'pid' : $scope.pid,
			'checkboxvalue1':$scope.checkboxvalue1,
			'checkboxvalue2':$scope.checkboxvalue2,
			'radiobuttonvalue':$scope.radiobuttonvalue,
			'privatenames':$scope.privatenames
        })
            .success(function (data, status, headers, config) {
                // close modal
                $('#myModal').modal('hide');

                // clear modal content
                $scope.clearForm();

                // refresh the product list
                $scope.getAll();
			
		
            })
            .error(function (data, status, headers, config) {
                $scope.loader.loading = false;
                $scope.modalstatustext = "Unable to Update data!";
            });
    };
	

});