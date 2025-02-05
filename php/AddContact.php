<?php
	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Email = $inData["Email"];
	$Phone = $inData["Phone"];
	$UserID = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{		
		if ($FirstName == null || $FirstName == "" || $FirstName == " ")
		{
			http_response_code(411);
			returnWithError("First name cannot be empty");
			return;
		}
		else if ($LastName == null || $LastName == "" || $LastName == " ")
		{
			http_response_code(411);
			returnWithError("Last name cannot be empty");
			return;
		}
		else if ($Email == null || $Email == "" || $Email == " ")
		{
			http_response_code(411);
			returnWithError("Email cannot be empty");
			return;
		}
		else if ($Phone == null || $Phone == "" || $Phone == " ")
		{
			http_response_code(411);
			returnWithError("Phone number cannot be empty");
			return;
		}
		else
		{
			$stmt = $conn->prepare("INSERT INTO Contacts (FirstName,LastName,Phone,Email,UserID) VALUES(?,?,?,?,?)");
			$stmt->bind_param("ssssi", $FirstName, $LastName, $Phone, $Email, $UserID);
			$stmt->execute();	
			$stmt->close();
			$conn->close();
			returnWithError("");
			sendResultInfoAsJson($row['FirstName'], $row['LastName'], $row['Phone'], $row['Email']);
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