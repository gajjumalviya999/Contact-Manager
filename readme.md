Routes

Create a User:
Post req
{baseURL}/users/register/
body:{ username, email, password }

login a User:
Post Req
{baseURL}/users/login
body: {email, password }

get current user information
Get req:
{baseURL}/users/currentUser
Authantication : Bearer

Create a Contact
Post req:
{baseURL}/api/contacts/
Authantication : Bearer
body :  { name, num, email } 

Get all contacts
get req:
{baseURL}/api/contacts/
Authantication : Bearer


Get single contact
get req:
{baseURL}/api/contacts/:id
Authantication : Bearer

Update single contact
Put req:
{baseURL}/api/contacts/:id
Authantication : Bearer
Body :{ name, num, email } //pass whatever needs to be updated

Delete single contact
Delete req:
{baseURL}/api/contacts/:id
Authantication : Bearer


