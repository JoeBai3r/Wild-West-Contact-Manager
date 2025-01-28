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
		echo "Connected to database";
		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $hashedPassword);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
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