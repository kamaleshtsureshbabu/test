var employeeJson = {};

function getJson() {
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {
      		employeeJson = JSON.parse(xhttp.responseText);
			listEmployee();
	    }
	};
	xhttp.open("GET", "./data/data.json", false);
	xhttp.send();
}


function listEmployee() {
	document.getElementById("search-box").value = null;
	document.getElementById("employee-list").innerHTML = "";
	employeeJson.sort(function(a, b) {
		return a.name.localeCompare(b.name);
	});
	for (var i = 0; i < employeeJson.length; i++) {
		document.getElementById("employee-list").innerHTML += '<div class="draw-bottom-border"><table border="0"><tr><td rowspan="2"><img src="'+employeeJson[i].avatar+'" ></td><td><h3>'+employeeJson[i].name+'</h3><p>'+employeeJson[i].designation+'</p></td></tr></table></div>';
	}
}

function searchEmployee(searchString) {
	var searchString = searchString.toLowerCase();
	var flag = 0;
	document.getElementById("employee-list").innerHTML = "";
	if(searchString.length > 0) {
		for(var i = 0; i < employeeJson.length;i++) {
			if(employeeJson[i].name.toLowerCase().search(searchString) >= 0 || employeeJson[i].designation.toLowerCase().search(searchString) >= 0) {
				flag = 1;
				document.getElementById("employee-list").innerHTML += '<div class="draw-bottom-border"><table border="0"><tr><td rowspan="2"><img src="'+employeeJson[i].avatar+'" ></td><td><h3>'+employeeJson[i].name+'</h3><p>'+employeeJson[i].designation+'</p></td></tr></table></div>';	
			}
		}
		
		if(flag == 0) {
			document.getElementById("employee-list").innerHTML = "";
			document.getElementById("employee-list").innerHTML = '<p class="text-center"><a onclick="showAddForm()">Add This Entry</a></p>';
		}
	} else {
		listEmployee();
	}
}

function showAddForm() {
	document.getElementById("employee-list").innerHTML = "";
	document.getElementById("employee-list").innerHTML = '<form class="col-md-offset-3 form-inline"><div class="form-group"><input type="text" id="name" name="name" placeholder="Employee Name" class="form-control"></div><div class="form-group">&nbsp;<input type="text" id="designation" name="designation" placeholder="Designation" class="form-control">&nbsp;<input type="button" class="btn btn-info" value="Add Employee" onclick="addEmployee()"></div></form><div class="col-md-offset-3 text-danger" id="validation-msg"></div>';
}

function addEmployee() {
	var name = document.getElementById('name').value;
	var designation = document.getElementById('designation').value;
	
	if(name.trim() == "" || name == null) {
		document.getElementById('validation-msg').innerHTML = "Enter Name Field";
	} else if (designation.trim() == "" || designation == null) {
		document.getElementById('validation-msg').innerHTML = "Enter Designation Field";
	} else {
		document.getElementById('validation-msg').innerHTML = "";
		var obj = {
    		"name": name,
    		"designation": designation,
    		"avatar": "http://coenraets.org/apps/angular-directory/pics/james_king.jpg"
  		};
  		employeeJson.push(obj);
  		listEmployee();
	}
}