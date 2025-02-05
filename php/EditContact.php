<?php
// Database connection parameters
$inData = getRequestInfo();

// Create connection
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

// Check connection
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$ID = $inData["ID"];
$FirstName = $inData["FirstName"];
$LastName = $inData["LastName"];
$Phone = $inData["Phone"];
$Email = $inData["Email"];

// Prepare the SQL statement to update the contact

// Prepare and bind
$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
$stmt->bind_param("ssssi", $FirstName, $LastName, $Phone, $Email, $ID);
$stmt->execute();
$stmt->close();
$conn->close();

sendResultInfoAsJson($row['ID']);

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
