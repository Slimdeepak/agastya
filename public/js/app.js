var app = angular.module("myApp",[]);
var activeInfoWindow;
/*
app.controller('AddController', function($http){

    this.formData = {};
    this.isShown=false;
    this.Info = "";
    this.studentsInfo = [];
    this.grade = "";
    this.strength = "";
    var that = this;

    
    this.addMoreClass = function(event){
    	if(that.grade!="" || that.strength!=""){
    		var target = angular.element(event.target);
	    	target.text("Add More Class");
	    	target.addClass('btn-danger')
	    	this.studentsInfo.push({"grade":this.grade,"strength":this.strength});
	    	this.grade = "";
	    	this.strength = "";
    	}
    	else{
    		 that.isShown = true;
             that.Info = "Required!! Please fill all fields";
    	}
    };

    
    this.addSchool = function() {
    	if(that.formData.school == "" || that.formData.principal == "" || that.formData.contact == ""
    		|| that.formData.latitude == "" || that.formData.longitude == "" || that.studentsInfo.length==0){
    		 that.isShown = true;
             that.Info = "Required!! Please fill all fields";
    		}
    	else{

        // Grabs all of the text box fields
        var userData = {
            school: this.formData.school,
            principal: this.formData.principal,
            contact: this.formData.contact,
            latitude: this.formData.latitude,
            longitude:this.formData.longitude,
            students : this.studentsInfo
        };


        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                that.formData.school = "";
                that.formData.principal = "";
                that.formData.contact = "";
                that.formData.latitude = "";
                that.formData.longitude ="";
                that.isShown = true;
                that.Info = "Successfully Added";
                
            })
            .error(function (data) {
                console.log('Post Error: ' + data);
                that.isShown = true;
                that.Info = "Failed to add";
            });
        }
    };
});
*/



app.controller("PanelController",function(){
	this.tab = 1;
	this.selectTab = function(setTab){
		this.tab = setTab;
	};
	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	};
	this.addPoint = function(){
		alert("My work is to add point to database");
	};
});






app.controller("MapController",function($http){

              this.formData = {};
    this.isShown=false;
    this.Info = "";
    this.studentsInfo = [];
    this.grade = "";
    this.strength = "";
    var that = this;

    
    this.addMoreClass = function(event){
        if(that.grade!="" || that.strength!=""){
            var target = angular.element(event.target);
            target.text("Add More Class");
            target.addClass('btn-danger')
            this.studentsInfo.push({"grade":this.grade,"strength":this.strength});
            this.grade = "";
            this.strength = "";
        }
        else{
             that.isShown = true;
             that.Info = "Required!! Please fill all fields";
        }
    };

    
    this.addSchool = function() {
        if(that.formData.school == "" || that.formData.principal == "" || that.formData.contact == ""
            || that.formData.latitude == "" || that.formData.longitude == "" || that.studentsInfo.length==0){
             that.isShown = true;
             that.Info = "Required!! Please fill all fields";
            }
        else{

        // Grabs all of the text box fields
        var userData = {
            school: this.formData.school,
            principal: this.formData.principal,
            contact: this.formData.contact,
            latitude: this.formData.latitude,
            longitude:this.formData.longitude,
            students : this.studentsInfo
        };


        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                that.formData.school = "";
                that.formData.principal = "";
                that.formData.contact = "";
                that.formData.latitude = "";
                that.formData.longitude ="";
                that.isShown = true;
                that.Info = "Successfully Added";
                
            })
            .error(function (data) {
                console.log('Post Error: ' + data);
                that.isShown = true;
                that.Info = "Failed to add";
            });
        }
    };

    

			this.loadMap = function(){
				var x=new google.maps.LatLng(12.999118, 77.595395);

				var options = {
		    		center:x,
		    		zoom:5,
		    		mapTypeId:google.maps.MapTypeId.SPATIAL
		  		};

		  		var map=new google.maps.Map(document.getElementById("googleMap"),options);

		  		for (var i = 0; i < map_array.length; i++) {
        			(function(mapobj) {
            			var latLng = new google.maps.LatLng(mapobj.latitude, mapobj.longitude);
            			var marker = new google.maps.Marker({
                			position: latLng,
                			map: map
            			});

            			var contentString = '<div id="content">'+
										      '<div id="siteNotice">'+
										      '</div>'+
										      '<h1>'+mapobj.school+'</h1>'+
										      '<div id="bodyContent">'+
										      '<p><b>'+mapobj.principal+'</b></p>'+
										      '<p><b>'+mapobj.contact+'</b></p>'+
                                              '<table class="table table-hover">'+
                                              '<thead><tr><th>Grade</th><th>Strength</th></tr></thead><tbody>';

                        for(var j=0;j<mapobj.students.length;j++){
                            contentString += '<tr><td>'+mapobj.students[j].grade+'</td><td>'+mapobj.students[j].strength+'</td></tr>';
                        }

						contentString+='</tbody></table></div></div></div>';

            			var infowindow = new google.maps.InfoWindow({
    						content: contentString
  						});

  						marker.addListener('click', function() {
  							  if ( activeInfoWindow == infowindow ) {
						            return;
						        }
						        if ( activeInfoWindow ) {
						            activeInfoWindow.close();
						        }
						        infowindow.open(map, marker);
						        activeInfoWindow = infowindow;
  						});

        			})(map_array[i]);
    			};	


			};


			function mapPoint(latitude,longitude,school,principal,contact,students){
					this.latitude = latitude;
					this.longitude = longitude;
					this.school = school;
            		this.principal =principal;
            		this.contact = contact;
                    this.students = students;
			};


			var map_array = [];
			var that = this;


			this.loadMap1 = function(){
			    	$http.get('/users').success(function(response){
			    	 		for(var i=0;i<response.length;i++){
			    	 			var lat = response[i].latitude;
			    	 			var lon = response[i].longitude;
			    	 			var school = response[i].school;
			    	 			var principal = response[i].school;
			    	 			var contact = response[i].contact;
                                var students = response[i].students;
			    	 			if(lat!="" && lat!=undefined && lon!=undefined && lon!=""){
			    	 				var obj = new mapPoint(lat,lon,school,principal,contact,students);
			    	 				map_array.push(obj);
			    	 			}
			    	 		}
			    	 		that.loadMap();	
			    	 		console.dir(map_array);
			            }).error(function(){
			                console.log("loadMap1 Service Error");
			        });
		    }
});

