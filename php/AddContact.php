<?php
	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Email = $inData["Email"];
	$Phone = $inData["Phone"];
	$ID = $inData["ID"];
	$UserID = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT COUNT(*) FROM Users WHERE ID = ?");
		$stmt->bind_param("s", $UserID);
		$stmt->execute();
		$stmt->bind_result($count);
		$stmt->fetch();
		$stmt->close();
		
		if ($count > 0) {
			$stmt = $conn->prepare("INSERT INTO Contacts (FirstName,LastName,Phone,Email,UserID) VALUES(?,?,?,?,?)");
			$stmt->bind_param("sssss", $FirstName, $LastName, $Phone, $Email, $UserID);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		
		}
		else {
			returnWithError("User does not exist.");
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
