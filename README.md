# Airport Travel Advisor API Documentation

This API allows users to book flights, retrieve available routes, flight times, costs and suggest alternative routes.

## Technical requirements
- Express
- Postgres
- Node.js v18.18.0 LTS
- Docker

## [Data modeling](dataModeling.md)

## API routes

### 1. Available routes
- **Endpoint**: `/api/v1/routes`
- **Method**: `GET`
- **Description**: Retrieve a list of available routes between two locations.
- **Optional parameters**:
  - `from`: The origin airport code.
  - `to`: The destination airport code.
- **Response:**
```
{
  "routes": [
    {
      "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab",
      "from": "WAW",
      "to": "TAS",
      "distance": 3000,
      "duration": "4 hours",
      "layovers": ["IST", "VIE"]
    },
    // Other routes can be listed here
  ]
}
```
---
- **Method**: `POST`, `PUT` (available only for admin)
- **Description**: Create/update a route between two locations.
- **Content-Type**: `application/json`
- **Request**: `POST /api/v1/routes`
```
{
    "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab"
    "from": "WAW",
    "to": "TAS",
    "distance": 3000,
    "duration": "4 hours",
    "layovers": ["IST", "VIE"]
}
```
- **Response:**
```
{
  "message": "Route successfully created/updated.",
  "route": {
    "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab",
    "from": "WAW",
    "to": "TAS",
    "distance": 3000,
    "duration": "4 hours",
    "layovers": ["IST", "VIE"]
  }
}
```
---
- **Method**: `DELETE` (available only for admin)
- **Description**: Delete a route between two locations.
- **Parameters**:
  - `routeId`: the ID of specific route
- **Request**: `DELETE /api/v1/routes?routeId=42d31599-53a9-4040-8ec2-e1e6989d15ab`
- **Response:**
```
{
  "message": "Route successfully deleted.",
  "deletedRouteId": "42d31599-53a9-4040-8ec2-e1e6989d15ab"
}
```


### 2. Flight information
- **Endpoint**: `/api/v1/flights`
- **Methods**: `GET` 
- **Description**: Get information about a specific flight.
- **Parameters**:
  - `id`: The unique flight identifier.
- **Response:**
```
{
  "flight": {
    "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab",
    "flightId": "9a89da7e-422e-4269-90e8-154a50324ef7",
    "departureTime": "2023-11-01T12:00:00",
    "aircraft": "Boeing 737",
    "capacity": 150,
    "price": 450.50
  }
}
```
---
- **Method**: `POST`, `PUT` (available only for admin)
- **Description**: Create a flight between two locations.
- **Content-Type**: `application/json`
- **Request**: `POST /api/v1/flights`
```
{
    "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab"
    "flightId": "9a89da7e-422e-4269-90e8-154a50324ef7"
    "departureTime": "2023-11-01T12:00:00",
    "aircraft": "Boeing 737",
    "capacity": 150
    "price": 450.50
}
```
- **Response:**
```
{
  "message": "Flight successfully created.",
  "flight": {
    "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab",
    "flightId": "9a89da7e-422e-4269-90e8-154a50324ef7",
    "departureTime": "2023-11-01T12:00:00",
    "aircraft": "Boeing 737",
    "capacity": 150,
    "price": 450.50
  }
}

```
---
- **Method**: `DELETE` (available only for admin)
- **Description**: Delete a flight between two locations.
- **Parameters**:
  - `flightId`: the ID of specific flight
- **Request**: `DELETE /api/v1/flights?flightId=9a89da7e-422e-4269-90e8-154a50324ef7`
- **Response:**
```
{
  "message": "Flight successfully deleted.",
  "deletedFlightId": "9a89da7e-422e-4269-90e8-154a50324ef7"
}
```

### 3. Search flights
- **Endpoint**: `/api/v1/search`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Description**: Search for flights
- **Request**: `POST /api/v1/search`
```
{
    "from": "WAW",
    "to": "TAS",
    "date": "2023-10-12"
}
```
- **Response:**
```
{
  "flights": [
    {
      "routeId": "42d31599-53a9-4040-8ec2-e1e6989d15ab",
      "flightId": "9a89da7e-422e-4269-90e8-154a50324ef7",
      "departureTime": "2023-10-12T12:00:00",
      "aircraft": "Boeing 737",
      "price": 450.50
    },
    // Other flights can be listed here
  ]
}
```

### 4. Alternative Routes
- **Endpoint**: `/api/v1/alternatives`
- **Method**: `GET`
- **Description**: Retrieve a list of aternative routes between two locations.
- **Optional parameters**:
  - `from`: The origin airport code.
  - `to`: The destination airport code.
- **Response:**
```
{
  "alternatives": [
    {
      "originalRouteId": 123,
      "alternativeRouteId": 456,
      "layovers": ["Airport X", "Airport Y"],
      "additionalDetails": "This alternative route avoids busy airports"
    },
    // Other alternative routes can be listed here
  ]
}
```
---
- **Method**: `POST` (available only for admin)
- **Description**: Create an alternative route between two locations.
- **Content-Type**: `application/json`
- **Request**: `POST /api/v1/alternatives`
```
{
    "originalRouteId": 123,
    "alternativeRouteId" 456
    "layovers": ["Airport X", "Airport Y"],
    "additionalDetails": "This alternative route avoids busy airports",
}
```
- **Response:**
```
{
  "message": "Alternative route successfully created.",
  "alternativeRoute": {
    "originalRouteId": 123,
    "alternativeRouteId": 456,
    "layovers": ["Airport X", "Airport Y"],
    "additionalDetails": "This alternative route avoids busy airports"
  }
}
```
---
- **Method**: `DELETE` (available only for admin)
- **Description**: Delete an alternative route between two locations.
- **Parameters**:
  - `alternativeRouteId`: the ID of specific alternative route
- **Request**: `DELETE /api/v1/alternatives?alternativeRouteId=456`
- **Response:**
```
{
  "message": "Alternative route successfully deleted.",
  "deletedAlternativeRouteId": 456
}
```

### 5. Layover information
- **Endpoint:** `/api/v1/layovers`
- **Method:** GET
- **Description:** Retrieve information about layovers for a specific route.
- **Optional parameters**:
  - `id`: The unique flight identifier.
- **Response:**
```
{
  "layovers": [
    {
      "layoverId": 789,
      "airport": "Airport X",
      "duration": "2 hours"
    },
    // Other layovers can be listed here
  ]
}
```

### 6. Book a flight
- **Endpoint:** `/api/v1/bookings`
- **Method:** POST
- **Content-Type**: `application/json`
- **Description:** book a flight.
- **Request:** `POST /api/v1/bookings`
```
{
    "flightId": 789,
    "passengerName": "John Smith",
    "passengerEmail": "john.smith@example.com",
    "passengerPhone": "+48345678901",
    "seatPreference": "by Window",
    "additionalRequests": "Vegetarian meal requested",
    "paymentDetails": {
        "cardNumber": "1234-5678-9012-3456",
        "expirationDate": "12/25",
        "cvv": "123"
    }
}
```
- **Response:**
```
{
  "message": "Booking successful.",
  "bookingDetails": {
    "flightId": 789,
    "passengerName": "John Smith",
    "seat": "by Window",
    "additionalRequests": "Vegetarian meal requested",
    "totalPrice": 450.50
  }
}
```

## JWT Authentication

### 1. User registration
- **Endpoint** `/api/v1/register`
- **Method:** `POST`
- **Content-Type**: `application/json`
- **Description:** Register a user
- **Request:** `POST /api/v1/register`
```
{
    "email": "johnsmith@example.com"
    "username": "john_smith",
    "password": "secret"
}
```
- **Response:**
```
{
  "message": "User successfully registered.",
  "user": {
    "userId": "12345",
    "email": "johnsmith@example.com",
    "username": "john_smith"
  }
}
```

### 2. User authorization
- **Endpoint** `/api/v1/login`
- **Method:** `POST`
- **Content-Type**: `application/json`
- **Description:** Authorize a user
- **Request:** `POST /api/v1/login`
```
{
    "username": "john_smith",
    "password": "secret"
}
```
- **Response:**
```
{
  "message": "User successfully authorized.",
  "accessToken": [access_token],
  "refreshToken": [refresh_token],
  "expiresIn": "3600"
}
```


### 3. Refresh token
- **Endpoint** `/api/v1/refresh`
- **Method:** `POST`
- **Content-Type**: `application/json`
- **Description:** Refresh token
- **Request:** `POST /api/v1/login`
```
{
    "username": "john_smith"
    "refreshToken": [refreshToken] //refresh token we got from user authorization
}
```
- **Response:**
```
{
  "accessToken": [new_access_token],
  "expiresIn": "3600" // expiration time in seconds
}
```

### 4. Logout
- **Endpoint** `/api/v1/logout`
- **Method:** `GET`
- **Description:** logout the user
- **Response:**
{
  "message": "User successfully logged out."
}

**Note:** For all authenticated requests, the Authorization header with the JWT token is required. If not 401 Unauthorized response is returned.

## User Roles

### 1. Admin
- **Privileges:**
  - Access to all API endpoints.
  - Ability to add, modify, or remove flights, routes and alternatives.

### 2. User
- **Privileges:**
  - Access to essential API endpoints for searching and viewing flight information.
  - Ability to book flights.

### 3. Guest
- **Privileges:**
  - Limited access to public API endpoints (e.g., retrieving general route and flight information).
  - No ability to perform actions that require user authentication such as booking.
