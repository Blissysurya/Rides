# Backend API Documentation

## User Registration Endpoint

### Endpoint
`POST /user/register`

### Description
This endpoint allows a new user to register by providing their email, password, and full name.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string): The user's email address. Must be a valid email.
- `password` (string): The user's password. Must be at least 5 characters long.
- `fullname` (object): An object containing the user's full name.
  - `firstname` (string): The user's first name. Must be at least 2 characters long.
  - `lastname` (string): The user's last name. (optional)

### Response
- `201 Created`: The user was successfully registered.
  - Body: A JSON object containing the registered user and a JWT token.
- `400 Bad Request`: The request body is invalid.
  - Body: A JSON object containing the validation errors.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### Example Response
```json
{
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Validation Errors
If the request body is invalid, the response will contain a list of validation errors. Example:
```json
{
  "errors": [
    {
      "msg": "Email is not valid",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password should be at least 5 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "First name should be at least 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```