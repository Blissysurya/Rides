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
# Backend API Documentation

## Captain Registration Endpoint

### Endpoint
`POST /captain/register`

### Description
This endpoint allows a new captain to register by providing their email, password, full name, and vehicle details.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string): The captain's email address. Must be a valid email.
- `password` (string): The captain's password. Must be at least 5 characters long.
- `fullname` (object): An object containing the captain's full name.
  - `firstname` (string): The captain's first name. Must be at least 2 characters long.
  - `lastname` (string): The captain's last name. Must be provided.
- `vehicle` (object): An object containing the captain's vehicle details.
  - `color` (string): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string): The license plate of the vehicle. Must be at least 3 characters long.
  - `capacity` (number): The seating capacity of the vehicle. Must be a number and at least 1.
  - `vehicleType` (string): The type of the vehicle. Must be one of `car`, `bike`, or `auto`.

### Response
- `201 Created`: The captain was successfully registered.
  - Body: A JSON object containing the registered captain and a JWT token.
- `400 Bad Request`: The request body is invalid or a captain with the same email already exists.
  - Body: A JSON object containing the validation errors or an error message.

### Example Request
```json
{
  "email": "captain.john@example.com",
  "password": "securepassword",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
```json
{
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "captain.john@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
      "msg": "Password should be atleast 5 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "First name should be atleast 2 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Color should be atleast 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```