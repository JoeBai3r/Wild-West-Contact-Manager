<?php
	$inData = getRequestInfo();

	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];
	$hashedPassword = password_hash($Password, PASSWORD_DEFAULT);

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//check to make sure username doesn't already exist
		$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login = ?");
		$stmt->bind_param("s", $Login);


		$stmt->execute();
		$result = $stmt->get_result();
		if ($result->num_rows > 0) {
			http_response_code(409);
			returnWithError("Username already exists");
		}
		else if ($Login == null || $Login == "" || $Login == " ")
		{
			http_response_code(410);
			returnWithError("Login cannot be empty");
		}
		else if ($FirstName == null || $FirstName == "" || $FirstName == " ")
		{
			http_response_code(410);

			returnWithError("First name cannot be empty");
		}
		else if ($LastName == null || $LastName == "" || $LastName == " ")
		{
			http_response_code(410);

			returnWithError("Last name cannot be empty");
		}
		else if ($Password == null || $Password == "" || $Password == " ")
		{
			http_response_code(410);

			returnWithError("Password cannot be empty");
		}
		else
		{
			//if duplicate username doesn't exist, insert new user
			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $hashedPassword);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>