const urlBase = 'http://cop4331-contact-manager-lampstack.online';
const extension = 'php';

let userId = 0;
let userFirstName = "";
let userLastName = "";


function loginFunc() {
	userId = 0;
	userFirstName = "";
	userLastName = "";
	
	let usernameLogin = document.getElementById("Username").value;
	let password = document.getElementById("Password").value;
	
	document.getElementById("loginResult").innerHTML = "";


	let tempVar = {usernameLogin:usernameLogin,password:password};
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
				let jsonObject = JSON.parse( xhr.responseText );
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

function signupFunc(){
	window.location.href = "signup.html";
}
