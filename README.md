# LAMP-stack-project-POOS
<p align=center> ![logo](https://github.com/user-attachments/assets/d4ee29bd-34f2-4ac0-9294-efa7b68f6fa3) </p>

hello folks

# API Testing:

LOGIN: use existing login and password from user
{
    "Login" : "",
    "Password" : ""
}

REGISTER: new user information
{
    "FirstName" : "",
    "LastName" : "",
    "Login" : "",
    "Password" : "" 
}

SEARCH CONTACTS: searches by userID if they exist in User table, returns array of JSO objects (contacts that the user has created)
{
    "UserID" : "",
    "search" : ""
}

ADD CONTACT: adds new contact information if the userID belongs to an existing user
{
    "FirstName" : "",
    "LastName" : "",
    "Phone" : "",
    "Email" : "",
    "UserId" : "" 
}

DELETE CONTACT: finds the cooresponding userID and contact ID to find contact to delete
{
    "ID" : "",
    "UserID" : ""
}

EDIT CONTACT: edits the contact from the given contact ID 
{
    "ID" : "",
    "FirstName" : "",
    "LastName" : "",
    "Phone": "",
    "Email" : ""
}
