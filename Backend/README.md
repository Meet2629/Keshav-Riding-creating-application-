```markdown
# User Registration API

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
- **fullname**: `{ firstname: string, lastname: string }`  
- **email**: (string, required, valid email)  
- **password**: (string, required, min 6 chars)

### Response:
#### Success (201):
```json
{
  "token": "jwt_token",
  "user": { "fullname": { "firstname": "John", "lastname": "Doe" }, "email": "john.doe@example.com" }
}
```

#### Error (400):
```json
{
  "errors": [
    { "msg": "Invalid Email", "path": "email" },
    { "msg": "First Name must be 3 characters", "path": "fullname.firstname" }
  ]
}
```

### Status Codes:
- **201**: User created, token returned.
- **400**: Validation error or duplicate email.

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
### Dependencies:
express
mongoose
bcrypt
jsonwebtoken
express-validator
```
