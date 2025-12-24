# Salon Management System - Backend API

A complete backend authentication, authorization, and appointment management system for a salon business built with **Express.js**, **Firebase Firestore**, **JWT**, and **Role-Based Access Control**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Testing](#testing)
- [Database Schema](#database-schema)
- [Security](#security)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Authentication (Assignment 5)

- **User Registration** - Create new admin or staff accounts
- **User Login** - Authenticate and receive JWT tokens
- **Password Hashing** - Secure passwords using bcryptjs
- **Email Validation** - Validate email format and prevent duplicates
- **JWT Tokens** - 7-day expiration tokens for secure API access

### Authorization (Assignment 6)

- **JWT Middleware** - Verify tokens on protected routes
- **Role-Based Access Control** - Admin and staff roles
- **Authorization Header** - Bearer token format
- **Admin-Only Routes** - Service creation restricted to admins
- **Staff Access** - Limited to read-only operations

### Appointment Management (Assignment 4)

- **Customer Management** - Create and manage customer profiles
- **Service Management** - Create salon services (admin only)
- **Manual Validation** - Input validation without external libraries
- **Firestore Database** - Cloud-based data storage

## 🛠️ Tech Stack

| Technology             | Purpose               |
| ---------------------- | --------------------- |
| **Node.js**            | JavaScript runtime    |
| **Express.js**         | Web framework         |
| **Firebase Admin SDK** | Firestore database    |
| **bcryptjs**           | Password hashing      |
| **jsonwebtoken**       | JWT token generation  |
| **dotenv**             | Environment variables |

## 📁 Project Structure

```
backend-products-api/
├── src/
│   ├── config/
│   │   └── firebase.js              # Firebase initialization
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── customerController.js    # Customer management
│   │   └── serviceController.js     # Service management
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints (public)
│   │   ├── customerRoutes.js       # Customer endpoints (protected)
│   │   └── serviceRoutes.js        # Service endpoints (protected/admin)
│   ├── middlewares/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── roleMiddleware.js       # Role-based access control
│   │   └── errorHandler.js         # Error handling
│   ├── utils/
│   │   ├── passwordUtils.js        # Password hashing functions
│   │   └── jwtUtils.js             # JWT generation functions
│   ├── validators/
│   │   ├── authValidator.js        # Auth validation
│   │   ├── customerValidator.js    # Customer validation
│   │   └── serviceValidator.js     # Service validation
│   └── index.js                     # Express app entry point
├── .env.example                     # Example environment variables
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore database

### Step 1: Clone Repository

```bash
git clone https://github.com/Umer-Rafaqat/backend-products-api.git
cd backend-products-api
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- express (^5.2.1)
- firebase-admin (^13.6.0)
- bcryptjs (^3.0.3)
- jsonwebtoken (^9.0.3)
- dotenv (^17.2.3)
- nodemon (^3.1.11) - dev dependency

### Step 3: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Settings ⚙️** → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file

### Step 4: Create `.env` File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your credentials from the Firebase JSON file:

```env
# Firebase Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key-with-\n
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

⚠️ **Never commit `.env` file** - It's already in `.gitignore`

## ▶️ Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run on `http://localhost:5000`

## 🔐 Authentication & Authorization

### Token Format

Authorization header uses Bearer token format:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### JWT Token Structure

```javascript
{
  "userId": "abc123def456",
  "email": "user@salon.com",
  "role": "admin" or "staff",
  "iat": 1702900000,
  "exp": 1703504800
}
```

### Middleware Flow

```
Request → authMiddleware → Verify JWT → Extract User
                              ↓
                          Valid? → Attach to req.user → Next
                              ↓
                          Invalid → 401 Unauthorized

For Admin Routes:
Request → authMiddleware → roleMiddleware("admin") → Check Role
                              ↓
                          Admin? → Allow → Next
                              ↓
                          Not Admin → 403 Forbidden
```

### Protected Routes

| Route               | Method | Auth | Role  | Purpose           |
| ------------------- | ------ | ---- | ----- | ----------------- |
| `/auth/register`    | POST   | ❌   | -     | Register new user |
| `/auth/login`       | POST   | ❌   | -     | Login user        |
| `/customers/create` | POST   | ✅   | Any   | Create customer   |
| `/customers`        | GET    | ✅   | Any   | List customers    |
| `/customers/:id`    | GET    | ✅   | Any   | Get customer      |
| `/services/create`  | POST   | ✅   | Admin | Create service    |
| `/services`         | GET    | ✅   | Any   | List services     |

## 📡 API Endpoints

### Health Check

```
GET /
Response: API status and available endpoints
```

### Authentication Endpoints

#### Register User

```
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@salon.com",
  "password": "securepass123",
  "role": "admin"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@salon.com",
    "role": "admin",
    "createdAt": "2024-12-18T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User

```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "john@salon.com",
  "password": "securepass123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@salon.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Customer Endpoints

#### Create Customer (Protected)

```
POST /customers/create
Headers: Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "Jane Smith",
  "email": "jane@email.com",
  "phone": "555-1234"
}

Response (201):
{
  "id": "cust123",
  "name": "Jane Smith",
  "email": "jane@email.com",
  "phone": "555-1234",
  "createdAt": "2024-12-18T10:30:00.000Z",
  "message": "Customer created successfully"
}
```

#### Get All Customers (Protected)

```
GET /customers
Headers: Authorization: Bearer <token>

Response (200):
{
  "count": 5,
  "customers": [
    {
      "id": "cust123",
      "name": "Jane Smith",
      "email": "jane@email.com",
      "phone": "555-1234",
      "createdAt": "2024-12-18T10:30:00.000Z"
    }
  ]
}
```

#### Get Customer by ID (Protected)

```
GET /customers/:id
Headers: Authorization: Bearer <token>

Response (200):
{
  "id": "cust123",
  "name": "Jane Smith",
  "email": "jane@email.com",
  "phone": "555-1234",
  "createdAt": "2024-12-18T10:30:00.000Z"
}
```

### Service Endpoints

#### Create Service (Admin Only)

```
POST /services/create
Headers: Authorization: Bearer <admin-token>
Content-Type: application/json

Body:
{
  "name": "Hair Cut",
  "price": 25.99,
  "duration": 30
}

Response (201):
{
  "id": "svc123",
  "name": "Hair Cut",
  "price": 25.99,
  "duration": 30,
  "createdAt": "2024-12-18T10:30:00.000Z",
  "message": "Service created successfully"
}

Error Response (403 - Staff user):
{
  "error": "Forbidden",
  "details": "Only admins can access this resource"
}
```

#### Get All Services (Protected)

```
GET /services
Headers: Authorization: Bearer <token>

Response (200):
{
  "count": 5,
  "services": [
    {
      "id": "svc123",
      "name": "Hair Cut",
      "price": 25.99,
      "duration": 30,
      "createdAt": "2024-12-18T10:30:00.000Z"
    }
  ]
}
```

## 🧪 Testing

### Using Postman

#### 1. Register Admin User

- **Method:** POST
- **URL:** `http://localhost:5000/auth/register`
- **Body (JSON):**

```json
{
  "name": "Admin User",
  "email": "admin@salon.com",
  "password": "admin123",
  "role": "admin"
}
```

- **Copy the token from response**

#### 2. Create Service (with admin token)

- **Method:** POST
- **URL:** `http://localhost:5000/services/create`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer <your-admin-token>`
- **Body (JSON):**

```json
{
  "name": "Hair Cut",
  "price": 25.99,
  "duration": 30
}
```

#### 3. Get All Services (with token)

- **Method:** GET
- **URL:** `http://localhost:5000/services`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer <your-token>`

#### 4. Register Staff User

- **Method:** POST
- **URL:** `http://localhost:5000/auth/register`
- **Body (JSON):**

```json
{
  "name": "Staff User",
  "email": "staff@salon.com",
  "password": "staff123",
  "role": "staff"
}
```

#### 5. Test Staff Cannot Create Service

- **Method:** POST
- **URL:** `http://localhost:5000/services/create`
- **Headers:**
  - Key: `Authorization`
  - Value: `Bearer <your-staff-token>`
- **Body (JSON):**

```json
{
  "name": "Manicure",
  "price": 15.99,
  "duration": 20
}
```

- **Expected Response:** 403 Forbidden - "Only admins can access this resource"

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@salon.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Create Service (with token):**

```bash
curl -X POST http://localhost:5000/services/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Hair Cut",
    "price": 25.99,
    "duration": 30
  }'
```

**Get Services (with token):**

```bash
curl -X GET http://localhost:5000/services \
  -H "Authorization: Bearer <token>"
```

## 📊 Database Schema

### Users Collection

```javascript
{
  id: String (Auto-generated by Firestore),
  name: String (required, min 2 chars),
  email: String (required, unique, valid format),
  password: String (required, hashed with bcryptjs),
  role: String (required, "admin" or "staff"),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Customers Collection

```javascript
{
  id: String (Auto-generated by Firestore),
  name: String (required),
  email: String (required, valid format),
  phone: String (required),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Services Collection (NEW)

```javascript
{
  id: String (Auto-generated by Firestore),
  name: String (required),
  price: Number (required, positive),
  duration: Number (required, minutes),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔐 Security

### Password Security

- Passwords hashed with **bcryptjs** (10 salt rounds)
- Passwords never stored in plain text
- Passwords never returned in API responses

### JWT Security

- Tokens expire in **7 days**
- Tokens signed with secret key in environment variables
- Tokens contain: `userId`, `email`, `role`

### Authentication

- Bearer token format required for protected routes
- Token extracted and verified on each request
- Invalid tokens rejected with 401 status

### Authorization

- Role checked against Firestore database
- Admin routes protected with roleMiddleware
- Staff cannot access admin endpoints (403)

### Environment Variables

- All sensitive data in `.env` file
- `.env` never committed to git
- Different keys for development/production

### Validation

- Email format validation using regex
- Password length requirements (minimum 6 characters)
- Service data validation (price > 0, duration > 0)
- Duplicate email prevention
- User existence checks before operations

## 📝 Validation Rules

### Registration

| Field    | Rules                                |
| -------- | ------------------------------------ |
| name     | Required, min 2 characters, string   |
| email    | Required, valid email format, unique |
| password | Required, min 6 characters           |
| role     | Required, must be "admin" or "staff" |

### Login

| Field    | Rules                        |
| -------- | ---------------------------- |
| email    | Required, valid email format |
| password | Required, min 1 character    |

### Customer

| Field | Rules                        |
| ----- | ---------------------------- |
| name  | Required, non-empty string   |
| email | Required, valid email format |
| phone | Required, non-empty string   |

### Service

| Field    | Rules                      |
| -------- | -------------------------- |
| name     | Required, non-empty string |
| price    | Required, positive number  |
| duration | Required, positive number  |

## 🔄 Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Commit Changes

```bash
git add .
git commit -m "feat: description of your changes"
```

### Push to GitHub

```bash
git push origin feature/your-feature-name
```

### Create Pull Request

1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Add title and description
5. Click "Create Pull Request"

## 🚀 Future Enhancements

- [ ] Refresh token functionality
- [ ] Password reset feature
- [ ] Email verification on registration
- [ ] Logout with token blacklisting
- [ ] Rate limiting for login attempts
- [ ] User profile management
- [ ] Appointment status updates
- [ ] Staff scheduling system
- [ ] Customer notifications
- [ ] Admin dashboard analytics
- [ ] Two-factor authentication
- [ ] Appointment reminders

## 📧 Support & Contribution

For issues or feature requests, please create a GitHub issue.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Umer Rafaqat

---

**Last Updated:** December 18, 2024
**Version:** 2.0.0 (With Protected Routes & Role-Based Access Control)
