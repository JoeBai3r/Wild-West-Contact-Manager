
<?php

	$inData = getRequestInfo();
	
	$ID = 0;
	$FirstName = "";
	$LastName = "";

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Password FROM Users WHERE Login=?");
		$stmt->bind_param("s", $inData["Login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			$storedPassword = $row['Password'];
			$inputPassword = $inData["Password"];

			if (password_verify($inputPassword, $storedPassword) || $storedPassword === $inputPassword)
			{
				if ($storedPassword === $inputPassword) 
				{
					$newHashedPassword = password_hash($inputPassword, PASSWORD_DEFAULT);
					$updateStmt = $conn->prepare("UPDATE Users SET Password=? WHERE ID=?");
					$updateStmt->bind_param("si", $newHashedPassword, $row['ID']);
					$updateStmt->execute();
					$updateStmt->close();
				}

				returnWithInfo($row['FirstName'], $row['LastName'], $row['ID']);
			}
			else
			{
				returnWithError("Password is incorrect");
			}
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"ID":0,"FirstName":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $FirstName, $LastName, $ID )
	{
		$retValue = '{"ID":' . $ID . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
