const urlBase = 'http://cop4331-contact-manager-lampstack.online/LAMPAPI'; ///LAMPAPI
const extension = 'php';

let userId = 0;
let userFirstName = ""; 
let userLastName = "";
const idArray = [];


function loginFunc() {
	userId = 0;
	userFirstName = "";
	userLastName = "";
	
	let login = document.getElementById("loginUsername").value;
	let password = document.getElementById("loginPassword").value;
	
	document.getElementById("loginResult").innerHTML = "";


	let tempVar = {Login:login,Password:password};
	let payload = JSON.stringify( tempVar );

	url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.ID;
				console.log(userId);

				if( userId <= 0)
				{		
					document.getElementById("loginResult").innerHTML = "User or Password incorrect, try again";
					return;
				}
		
				userFirstName = jsonObject.userFirstName;
				userLastName = jsonObject.userLastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(payload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function registerFunc() {
	window.location.href = "signup.html";
}

function signupFunc() {
	userFirstName = document.getElementById("signupFirstName").value;
	userLastName = document.getElementById("signupLastName").value;

	let usernameSignup = document.getElementById("signupUsername").value;
	let password = document.getElementById("signupPassword").value;
	
	document.getElementById("signupResult").innerHTML = "";

	
	let tempVar = {FirstName:userFirstName,LastName:userLastName,Login:usernameSignup,Password:password};
	let payload = JSON.stringify( tempVar );

	url = urlBase + '/Register.' + extension; 

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.onreadystatechange = function() {
			if (this.readyState != 4) {
				return;
			}
			if(this.status == 410) {
				document.getElementById("signupResult").innerHTML = "One or more fields left blank, try again!";
				return;
		   }
			if(this.status == 409) {
			 	document.getElementById("signupResult").innerHTML = "User already exists, try again!";
			 	return;
			}
			if(this.status == 200) {
				let jsonObject = JSON.parse( xhr.responseText );
				
				document.getElementById("signupResult").innerHTML = "User succesfully added!";

				userFirstName = jsonObject.userFirstName;
				userLastName = jsonObject.userLastName;
	
				window.location.href = "index.html";
			}
		};
		xhr.send(payload);
	}
	catch(err){
		document.getElementById("signupResult").innerHTML = err.message;
	}

}

function logoutFunc() {
	userId = 0;
	userFirstName = "";
	userLastName = "";
	window.location.href = "index.html";
}

function displayContact() {
	document.getElementById("contactInputDisplay").addEventListener("click", function() {
        let addDashboard = document.getElementById("addContact");
        if (addDashboard.style.display === "none") {
            addDashboard.style.display = "block";
        } else {
            addDashboard.style.display = "none";
        }
    });
}

function addFunc() {
	let newContactFirstName = document.getElementById("contactFirstName").value;
	let newContactLastName = document.getElementById("contactLastName").value;
	let newContactNum = document.getElementById("contactPhoneNum").value;
	let newContactEmail = document.getElementById("contactEmail").value;
	
	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {FirstName:newContactFirstName,LastName:newContactLastName,Phone:newContactNum,Email:newContactEmail,UserID: userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				document.getElementById("contactFirstName").value = "";
				document.getElementById("contactLastName").value = "";
				document.getElementById("contactPhoneNum").value = "";
				document.getElementById("contactEmail").value = "";
			}
			if(this.status == 411) {
				document.getElementById("contactAddResult").innerHTML = "One or more fields left blank, try again!";
				return;
			}
			showContacts();
		};
		xhr.send(jsonPayload);
	}
	catch(err) {
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}


function searchFunc() {
	let contactSrch = document.getElementById("searchBox").value;

	document.getElementById("contactSearchResult").innerHTML = "";

	let tmp = {search:contactSrch,UserID:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactSearchResult").innerHTML = "Contacts(s) has been retrieved";
				document.getElementById("searchBox").value = "";
				showContacts(contactSrch);
			}
			else {
				document.getElementById("contactSearchResult").innerHTML = "No Contacts Found!";
				return;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err) {
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + userFirstName + ",lastName=" + userLastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" ) {
			userFirstName = tokens[1];
		}
		else if( tokens[0] == "lastName" ) {
			userLastName = tokens[1];
		}
		else if( tokens[0] == "userId" ) {
			userId = parseInt( tokens[1].trim() );
		}
	}
}

function editFunc(id) {
    document.getElementById("editButton" + id).style.display = "none";
    document.getElementById("saveButton" + id).style.display = "inline-block";

    var firstNameInput = document.getElementById("first_Name" + id);
    var lastNameInput = document.getElementById("last_Name" + id);
    var emailInput = document.getElementById("email" + id);
    var phoneInput = document.getElementById("phone" + id);

    var namef_data = firstNameInput.innerText;
    var namel_data = lastNameInput.innerText;
    var email_data = emailInput.innerText;
    var phone_data = phoneInput.innerText;

    // Set input fields with 15% width
    firstNameInput.innerHTML = "<input type='text' id='namef_text" + id + "' value='" + namef_data + "' style='width: 100%;'>";
    lastNameInput.innerHTML = "<input type='text' id='namel_text" + id + "' value='" + namel_data + "' style='width: 100%;'>";
    emailInput.innerHTML = "<input type='text' id='email_text" + id + "' value='" + email_data + "' style='width: 100%;'>";
    phoneInput.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + phone_data + "' style='width: 100%;'>";
}



function saveFunc(row) {
    var namef_val = document.getElementById("namef_text" + row).value;
    var namel_val = document.getElementById("namel_text" + row).value;
    var email_val = document.getElementById("email_text" + row).value;
    var phone_val = document.getElementById("phone_text" + row).value;
    var idValue = idArray[row]

    document.getElementById("first_Name" + row).innerHTML = namef_val;
    document.getElementById("last_Name" + row).innerHTML = namel_val;
    document.getElementById("email" + row).innerHTML = email_val;
    document.getElementById("phone" + row).innerHTML = phone_val;

    document.getElementById("editButton" + row).style.display = "inline-block";
    document.getElementById("saveButton" + row).style.display = "none";

    let tmp = {
        Phone: phone_val,
        Email: email_val,
        FirstName: namef_val,
        LastName: namel_val,
        ID: idValue
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/EditContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been updated");
                showContacts();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}


function deleteFunc(row) {
    var namef_val = document.getElementById("first_Name" + row).innerText;
    var namel_val = document.getElementById("last_Name" + row).innerText;
    nameOne = namef_val.substring(0, namef_val.length);
    nameTwo = namel_val.substring(0, namel_val.length);
    let check = confirm('Confirm deletion of contact: ' + nameOne + ' ' + nameTwo);
    if (check === true) {
        document.getElementById("row" + row + "").outerHTML = "";
        let tmp = {
            FirstName: nameOne,
            LastName: nameTwo,
			UserID: userId
        };

        let jsonPayload = JSON.stringify(tmp);

        let url = urlBase + '/DeleteContact.' + extension;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        try {
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    console.log("Contact has been deleted");
                    showContacts();
                }
            };
            xhr.send(jsonPayload);
        } catch (err) {
            console.log(err.message);
        }

    };

}

function showContacts(searchQuery = "") {
	let tmp = {search: searchQuery,UserID: userId};

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContacts.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>"
                for (let i = 0; i < jsonObject.results.length; i++) {
                    idArray[i] = jsonObject.results[i].ID;
                    text += "<tr id='row" + i + "'>";
                    text += "<td id='first_Name" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
                    text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + jsonObject.results[i].Email + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].Phone + "</span></td>";
                    text += "<td>" +
        				"<button type='button' class='buttons' id='editButton" + i + "' style='width:80px; height:50px; margin-right: 50px; background-color: #007BFF; color: white;' " +
						"onmouseover='this.style.backgroundColor=\"navy\"' " + "onmouseout='this.style.backgroundColor=\"#007BFF\"' " + "onclick='editFunc(" + i + ")'>Edit</button>" + 

						"<button type='button' class='buttons' id='saveButton" + i + "'onclick='saveFunc(" + i + ")' " + "style='display: none; width:80px; height:50px; margin-right: 50px; background-color: limegreen; color: white;' " +
						"onmouseover='this.style.backgroundColor=\"green\"' " + "onmouseout='this.style.backgroundColor=\"limegreen\"'>Save</button>" +

        				"<button type='button' class='buttons' id='deleteButton' style='width:80px; height:50px; margin-right: 50px; background-color: crimson; color: white;' " + "onclick='deleteFunc(" + i + ")' " + 
						"onmouseover='this.style.backgroundColor=\"maroon\"' " + "onmouseout='this.style.backgroundColor=\"crimson\"'>Delete</button>" +
        				"</td>";
					text += "<tr/>";
                }
                text += "</table>"
                document.getElementById("tbody").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}
