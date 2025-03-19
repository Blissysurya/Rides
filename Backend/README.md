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

---

## User Login Endpoint

### Endpoint
`POST /user/login`

### Description
This endpoint allows an existing user to log in by providing their email and password.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string): The user's email address. Must be a valid email.
- `password` (string): The user's password. Must be at least 5 characters long.

### Response
- `201 Created`: The user was successfully logged in.
  - Body: A JSON object containing the JWT token and user details.
- `400 Bad Request`: The request body is invalid.
  - Body: A JSON object containing the validation errors.
- `401 Unauthorized`: The email or password is incorrect.
  - Body: A JSON object containing an error message.

---

## User Profile Endpoint

### Endpoint
`GET /user/profile`

### Description
This endpoint retrieves the profile of the currently authenticated user.

### Headers
- `Authorization` (string): A valid JWT token in the format `Bearer <token>`.

### Response
- `200 OK`: The user's profile was successfully retrieved.
  - Body: A JSON object containing the user's details.
- `401 Unauthorized`: The user is not authenticated.
  - Body: A JSON object containing an error message.

### Example Response
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## User Logout Endpoint

### Endpoint
`GET /user/logout`

### Description
This endpoint logs out the currently authenticated user by clearing the authentication token.

### Headers
- `Authorization` (string): A valid JWT token in the format `Bearer <token>`.

### Response
- `200 OK`: The user was successfully logged out.
  - Body: A JSON object containing a success message.
- `401 Unauthorized`: The user is not authenticated.
  - Body: A JSON object containing an error message.

### Example Response
```json
{
  "message": "Logged out successfully"
}
```