<?php
	$inData = getRequestInfo();
	
	$UserID = $inData["UserID"];
	$ID = $inData["ID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT COUNT(*) FROM Contacts WHERE UserID = ?");
		$stmt->bind_param("s", $UserID);
		$stmt->execute();
		$stmt->bind_result($count1);
		$stmt->fetch();
        $stmt->close();
		
		if ($count1 == 0) {
			$conn->close();
			returnWithError("User doesn't exist.");
		}
		$stmt = $conn->prepare("SELECT COUNT(*) FROM Contacts WHERE UserID = ? AND ID = ?");
		$stmt->bind_param("ss", $UserID,$ID);
		$stmt->execute();
		$stmt->bind_result($count2);
		$stmt->fetch();
        $stmt->close();
		
		
		if($count2 > 0)
		{
			$stmt = $conn->prepare("DELETE FROM Contacts WHERE UserID = ? AND ID = ?");
			$stmt->bind_param("ss", $UserID,$ID);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
		}
		else
		{
			returnWithError("Contact does not exist.");
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