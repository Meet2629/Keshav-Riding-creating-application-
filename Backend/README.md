```markdown
# Backend API Documentation

## User Registration API

**Endpoint**: `/users/register`  
**Method**: `POST`

### Request Body:
```json
{
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "password": "string"
}
```

### Response:
- **201**: 
  ```json
  {
    "token": "jwt_token",
    "user": {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john.doe@example.com"
    }
  }
  ```
- **400**: 
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "path": "email" },
      { "msg": "First Name must be 3 characters", "path": "fullname.firstname" }
    ]
  }
  ```

### Example Request:
```bash
POST /users/register
Content-Type: application/json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

---

## User Login API

**Endpoint**: `/users/login`  
**Method**: `POST`

### Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

### Response:
- **200**: 
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "email": "john.doe@example.com",
      "fullname": { "firstname": "John", "lastname": "Doe" }
    }
  }
  ```
- **400**: 
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "path": "email" },
      { "msg": "Password must be at least 6 characters", "path": "password" }
    ]
  }
  ```
- **401**: 
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

### Example Request:
```bash
POST /users/login
Content-Type: application/json
{
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

---

## User Profile API

**Endpoint**: `/users/profile`  
**Method**: `GET`  
**Authentication**: Bearer token required

### Response:
- **200**: 
  ```json
  {
    "user": {
      "_id": "user_id",
      "email": "john.doe@example.com",
      "fullname": { "firstname": "John", "lastname": "Doe" }
    }
  }
  ```
- **401**: 
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Request:
```bash
GET /users/profile
Authorization: Bearer jwt_token
```

---

## User Logout API

**Endpoint**: `/users/logout`  
**Method**: `POST`  
**Authentication**: Bearer token required

### Response:
- **200**: 
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **401**: 
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Example Request:
```bash
POST /users/logout
Authorization: Bearer jwt_token
```

---

## Register Captain API

**Endpoint**: `/captains/register`  
**Method**: `POST`

### Request Body:
```json
{
    "fullname": { 
        "firstname": "string", 
        "lastname": "string" 
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": 1,
        "vehicleType": "car | motorcycle | auto"
    }
}
```

### Response:
- **201**: 
    ```json
    {
        "token": "jwt_token",
        "captain": {
            "fullname": { "firstname": "John", "lastname": "Doe" },
            "email": "john.doe@example.com",
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```
- **400**: 
    ```json
    {
        "errors": [
            { "msg": "Invalid Email", "path": "email" },
            { "msg": "First Name must be at least 3 characters long", "path": "fullname.firstname" },
            { "msg": "Password must be at least 6 characters long", "path": "password" },
            { "msg": "vehicle color must be at least 3 characters", "path": "vehicle.color" },
            { "msg": "plate must be at least 3 characters", "path": "vehicle.plate" },
            { "msg": "Capacity must be at least 1", "path": "vehicle.capacity" },
            { "msg": "Invalid vehicle Type", "path": "vehicle.vehicleType" }
        ]
    }
    ```
- **400**: 
    ```json
    {
        "message": "Captain already exists"
    }
    ```

### Example Request:
```bash
POST /captains/register
Content-Type: application/json
{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "strongpassword123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```


```markdown
## Captain Login API

**Endpoint**: `/captains/login`  
**Method**: `POST`

### Request Body:
```json
{
    "email": "string",
    "password": "string"
}
```

### Response:
- **200**: 
    ```json
    {
        "token": "jwt_token",
        "captain": {
            "_id": "captain_id",
            "email": "john.doe@example.com",
            "fullname": { "firstname": "John", "lastname": "Doe" },
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```
- **400**: 
    ```json
    {
        "errors": [
            { "msg": "Invalid Email", "path": "email" },
            { "msg": "Password must be at least 6 characters", "path": "password" }
        ]
    }
    ```
- **401**: 
    ```json
    {
        "message": "Invalid Email or Password"
    }
    ```

### Example Request:
```bash
POST /captains/login
Content-Type: application/json
{
    "email": "john.doe@example.com",
    "password": "strongpassword123"
}
```

---

## Captain Profile API

**Endpoint**: `/captains/profile`  
**Method**: `GET`  
**Authentication**: Bearer token required

### Response:
- **200**: 
    ```json
    {
        "captain": {
            "_id": "captain_id",
            "email": "john.doe@example.com",
            "fullname": { "firstname": "John", "lastname": "Doe" },
            "vehicle": {
                "color": "red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```
- **401**: 
    ```json
    {
        "message": "Unauthorized"
    }
    ```

### Example Request:
```bash
GET /captains/profile
Authorization: Bearer jwt_token
```

---

## Captain Logout API

**Endpoint**: `/captains/logout`  
**Method**: `POST`  
**Authentication**: Bearer token required

### Response:
- **200**: 
    ```json
    {
        "message": "Logout successful"
    }
    ```
- **401**: 
    ```json
    {
        "message": "Unauthorized"
    }
    ```

### Example Request:
```bash
POST /captains/logout
Authorization: Bearer jwt_token
```

---

## Dependencies

- express
- mongoose
- bcrypt
- jsonwebtoken
- express-validator
```
