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
$firstName = $inData["FirstName"];
$lastName = $inData["LastName"];
$phone = $inData["Phone"];
$email = $inData["Email"];

// Prepare the SQL statement to update the contact

// Prepare and bind
$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=?");
$stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $ID);

if ($stmt->execute()) 
	if ($stmt->affected_rows > 0) {
{
    echo "Contact updated successfully";
}
} else 
{
    returnWithError("Error updating contact");
}

$stmt->close();

$conn->close();

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
