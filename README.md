# Salon Management System - Backend API

A complete backend authentication and appointment management system for a salon business built with **Express.js**, **Firebase Firestore**, and **JWT**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
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
- **Error Handling** - Comprehensive validation and error messages

### Appointment Management (Assignment 4)

- **Customer Management** - Create and manage customer profiles
- **Appointment Scheduling** - Create and manage salon appointments
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
│   │   └── customerController.js    # Customer management logic
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   └── customerRoutes.js       # Customer endpoints
│   ├── utils/
│   │   ├── passwordUtils.js        # Password hashing functions
│   │   └── jwtUtils.js             # JWT generation functions
│   ├── validators/
│   │   ├── authValidator.js        # Auth validation
│   │   └── customerValidator.js    # Customer validation
│   ├── middlewares/
│   │   └── errorHandler.js         # Error handling
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

#### Create Customer

```
POST /customers/create
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

#### Get All Customers

```
GET /customers

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

#### Get Customer by ID

```
GET /customers/:id

Response (200):
{
  "id": "cust123",
  "name": "Jane Smith",
  "email": "jane@email.com",
  "phone": "555-1234",
  "createdAt": "2024-12-18T10:30:00.000Z"
}
```

## 🧪 Testing

### Using Postman

1. **Import Postman Collection** (optional)

   - Create requests for each endpoint

2. **Test Register**

   - Method: `POST`
   - URL: `http://localhost:5000/auth/register`
   - Body (JSON):

   ```json
   {
     "name": "Test User",
     "email": "test@salon.com",
     "password": "password123",
     "role": "staff"
   }
   ```

3. **Test Login**

   - Method: `POST`
   - URL: `http://localhost:5000/auth/login`
   - Body (JSON):

   ```json
   {
     "email": "test@salon.com",
     "password": "password123"
   }
   ```

4. **Test Create Customer**
   - Method: `POST`
   - URL: `http://localhost:5000/customers/create`
   - Body (JSON):
   ```json
   {
     "name": "Customer Name",
     "email": "customer@email.com",
     "phone": "555-5555"
   }
   ```

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@salon.com",
    "password": "password123",
    "role": "admin"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@salon.com",
    "password": "password123"
  }'
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

### Appointments Collection

```javascript
{
  id: String (Auto-generated by Firestore),
  customerId: String (required, must exist),
  serviceName: String (required),
  appointmentDate: String (required, YYYY-MM-DD format),
  notes: String (optional),
  status: String ("scheduled", "completed", "cancelled"),
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

### Environment Variables

- All sensitive data in `.env` file
- `.env` never committed to git
- Different keys for development/production

### Validation

- Email format validation using regex
- Password length requirements (minimum 6 characters)
- Duplicate email prevention
- User existence checks before operations

### Error Handling

- Generic error messages (don't expose user existence)
- Proper HTTP status codes
- Detailed logs in console (development only)

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

- [ ] Route protection middleware (verify JWT)
- [ ] Refresh token functionality
- [ ] Password reset feature
- [ ] Email verification on registration
- [ ] Logout with token blacklisting
- [ ] Rate limiting for login attempts
- [ ] User profile management
- [ ] Appointment status updates
- [ ] Service pricing management
- [ ] Staff scheduling system
- [ ] Customer notifications
- [ ] Admin dashboard analytics

## 📧 Support & Contribution

For issues or feature requests, please create a GitHub issue.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Umer Rafaqat

---

**Last Updated:** December 18, 2024
