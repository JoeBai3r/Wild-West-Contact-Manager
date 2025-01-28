const urlBase = 'http://cop4331-contact-manager-lampstack.online';
const extension = 'php';

let userId = 0;
let userFirstName = "";
let userLastName = "";


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
				userId = jsonObject.id;
		
				if( userId < 1 )
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

function signupFunc(){
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

	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4) {
				return;
			}
			if(this.status == 409) {
				document.getElementById("signupResult").innerHTML = "User already exists, try again!";
				return;
			}
			if(this.status == 200) {
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				
				document.getElementById("signupResult").innerHTML = "User succesfully added!";

				userFirstName = jsonObject.userFirstName;
				userLastName = jsonObject.userLastName;

				saveCookie();
	
				window.location.href = "index.html";
			}
		};
		xhr.send(payload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    document.cookie = "firstName=" + userFirstName + ",lastName=" + userLastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");

    for (var i = 0; i < splits.length; i++) {

        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");

        if (tokens[0] == "userFirstName") {
            firstName = tokens[1];
        }

        else if (tokens[0] == "userLastName") {
            lastName = tokens[1];
        }

        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }

    else {
        document.getElementById("userName").innerHTML = "Welcome, " + userFirstName + " " + userLastName + "!";
    }
}
