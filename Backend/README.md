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
# Backend API Documentation

## Captain Routes

---

### Captain Registration Endpoint

#### Endpoint
`POST /captain/register`

#### Description
This endpoint allows a new captain to register by providing their email, password, full name, and vehicle details.

#### Request Body
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

#### Response
- `201 Created`: The captain was successfully registered.
  - Body: A JSON object containing the registered captain and a JWT token.
- `400 Bad Request`: The request body is invalid or a captain with the same email already exists.
  - Body: A JSON object containing the validation errors or an error message.

#### Example Request
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

#### Example Response
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

---

### Captain Login Endpoint

#### Endpoint
`POST /captain/login`

#### Description
This endpoint allows an existing captain to log in by providing their email and password.

#### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string): The captain's email address. Must be a valid email.
- `password` (string): The captain's password. Must be at least 5 characters long.

#### Response
- `200 OK`: The captain was successfully logged in.
  - Body: A JSON object containing the JWT token and captain details.
- `400 Bad Request`: The request body is invalid or the email/password is incorrect.
  - Body: A JSON object containing the validation errors or an error message.

#### Example Request
```json
{
  "email": "captain.john@example.com",
  "password": "securepassword"
}
```

#### Example Response
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

---

### Captain Profile Endpoint

#### Endpoint
`GET /captain/profile`

#### Description
This endpoint retrieves the profile of the currently authenticated captain.

#### Headers
- `Authorization` (string): A valid JWT token in the format `Bearer <token>`.

#### Response
- `200 OK`: The captain's profile was successfully retrieved.
  - Body: A JSON object containing the captain's details.
- `401 Unauthorized`: The captain is not authenticated.
  - Body: A JSON object containing an error message.

#### Example Response
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
  }
}
```

---

### Captain Logout Endpoint

#### Endpoint
`GET /captain/logout`

#### Description
This endpoint logs out the currently authenticated captain by clearing the authentication token.

#### Headers
- `Authorization` (string): A valid JWT token in the format `Bearer <token>`.

#### Response
- `200 OK`: The captain was successfully logged out.
  - Body: A JSON object containing a success message.
- `401 Unauthorized`: The captain is not authenticated.
  - Body: A JSON object containing an error message.

#### Example Response
```json
{
  "message": "Logout successfully"
}
```

# Rides

## Features

- **Location Suggestions:**  
  As users type in the pickup or destination fields on the booking page, the frontend uses Axios to fetch location suggestions from the backend (`/location/suggest?q=...`). Suggestions are displayed in real-time in the `LocationSearchPanel`.

- **Interactive Selection:**  
  Clicking a suggestion automatically fills the corresponding input (pickup or destination) and closes the suggestion panel.

- **Modular Components:**  
  The UI is built with modular React components such as `LocationSearchPanel`, `VehiclePanel`, `ConfirmedRide`, `LookingForDriver`, and `WaitingForDriver`.

## How It Works

1. **User Input:**  
   When a user types in the pickup or destination input, the frontend calls the backend for suggestions.

2. **Backend Endpoint:**  
   The backend should expose a GET endpoint `/location/suggest?q=...` that returns a JSON object:
   ```json
   { "suggestions": ["Location 1", "Location 2", ...] }