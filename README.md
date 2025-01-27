# LAMP-stack-project-POOS

hello folks

# API Testing:

login: use existing login and password from user
{
    "Login" : "",
    "Password" : ""
}

register: new user information
{
    "FirstName" : "",
    "LastName" : "",
    "Login" : "",
    "Password" : "" 
}

search contacts: searches by userID if they exist in User table, returns array of JSO objects (contacts that the user has created)
{
    "UserID" : "",
    "search" : ""
}

add contact: adds new contact information if the userID belongs to an existing user
{
    "FirstName" : "",
    "LastName" : "",
    "Phone" : "",
    "Email" : "",
    "UserId" : "" 
}
delete contact: finds the cooresponding userID and contact ID to find contact to delete
{
    "ID" : "",
    "UserID" : ""
}

edit contact: edits the contact from the given contact ID 
{
    "ID" : "",
    "FirstName" : "",
    "LastName" : "",
    "Phone": "",
    "Email" : ""
}
