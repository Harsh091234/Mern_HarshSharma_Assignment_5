## 🚀 Live Preview
**Site Url:** [https://mern-harshsharma-assignment-5.onrender.com](https://mern-harshsharma-assignment-5.onrender.com)

---
## 🔐 Authentication API Endpoints

Base URL:

```
/api/user
```

Authentication is handled using **HTTP-only cookies** (Access Token + Refresh Token).

---

### 📌 Register User

**Endpoint**

```
POST /api/auth/register
```

**Description**
Creates a new user account and automatically logs the user in by issuing access & refresh tokens.

**Request Body**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "StrongPassword123",
  "phone": "9876543210",
  "deviceId": "chrome-desktop"
}
```

**Success Response**

```json
{
  "success": true,
  "user": {
    "_id": "64f1a9...",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "message": "User creating successfully"
}

```

**Error Responses**

* `400` → User already exists
* `400` → Validation error
* `500` → Server error

---

### 📌 Login User

**Endpoint**

```
POST /api/user/login
```

**Description**
Authenticates a user and issues new access & refresh tokens.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "StrongPassword123",
  "deviceId": "chrome-desktop"
}
```

**Success Response**

```json
{
  "success": true,
  "user": {
    "_id": "64f1a9...",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "9876543210"
  },
  "message": "User logined successfully"
}
```

**Error Responses**

* `400` → Invalid credentials
* `500` → Server error

---

### 📌 Get Authenticated User

**Endpoint**

```
GET /api/user/get-auth-user
```

**Description**
Returns the currently authenticated user using the access token stored in cookies.

🔒 **Protected Route**

**Headers**

```
Cookie: accessToken=...
```

**Success Response**

```json
{
  "success": true,
  "user": {
    "_id": "64f1a9...",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

**Error Responses**

* `401` → Unauthorized
* `500` → Server error

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server sets:

   * `accessToken` (short-lived, HTTP-only cookie)
   * `refreshToken` (long-lived, HTTP-only cookie)
3. Refresh tokens are stored per device
4. Protected routes use `protectRoutes` middleware

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh091234/Mern_HarshSharma_Assignment_5.git .

   ```

2. **Frontend & Backend Setup**
   ```bash
   pnpm run build
   ```

 ### 🔧 Environment Variables Setup

 #### Server (.env)
Create a `.env` file in the `server` directory:
```env
PORT=3000

MONGO_URI=mongo_uri
ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxx
REFRESH_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
NODE_ENV=dev
```

#### Client (.env)
Create a `.env` file in the `client` directory:
```env
VITE_MODE=dev
```

### 🚀 Running the Application

#### Development Mode (Live Preview)

1. **Start the Backend Server**
   ```bash
   cd server
   pnpm run dev
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd client
   pnpm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`