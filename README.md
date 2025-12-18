# 📅 Appointment Manager API

A simple REST API built using **Node.js**, **Express**, and **Firestore (Firebase Admin SDK)** to manage customers and their appointments.

This project is created as **Assignment 4** and follows proper backend structure with controllers, routes, manual validation, and Git workflow.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- Firestore (Firebase Admin SDK)
- Nodemon
- dotenv

---

## 📁 Folder Structure

```
src/
│
├── config/
│   └── firebase.js
│
├── controllers/
│   ├── customers.controller.js
│   └── appointments.controller.js
│
├── routes/
│   ├── customers.routes.js
│   └── appointments.routes.js
│
├── validators/
│   └── appointments.validator.js
│
└── index.js
```

---

## 🔥 What is Firestore?

Firestore is a NoSQL cloud database by Google.
It stores data in collections and documents instead of tables.
It is scalable, fast, and works well with Node.js APIs.

---

## 🚀 How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
PORT=5000
```

3. Start the server:

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### 👤 Customers

#### Create Customer

```
POST /customers/create
```

Example Request Body:

```json
{
  "name": "Ali Khan",
  "phone": "03001234567"
}
```

#### Get All Customers

```
GET /customers
```

#### Get Customer by ID

```
GET /customers/:id
```

---

### 📅 Appointments

#### Create Appointment

```
POST /appointments/create
```

Example Request Body:

```json
{
  "customerId": "CUSTOMER_ID",
  "serviceName": "Dental Checkup",
  "appointmentDate": "2025-10-01"
}
```

#### Get All Appointments

```
GET /appointments
```

#### Get Appointment by ID

```
GET /appointments/:id
```

---

## ✅ Validation Rules (Manual)

For appointment creation:

- `customerId` is required
- `serviceName` is required
- `appointmentDate` must be a valid date

If validation fails, API returns:

```
Status: 400 Bad Request
```

---

## 🧪 Testing

All APIs are tested using **Postman**.

---

## 🔐 Security Notes

The following files are ignored using `.gitignore`:

- `node_modules/`
- `.env`
- `serviceAccountKey.json`

Service account keys are never pushed to GitHub.

---

## 🌿 Git Workflow

- New branch created for assignment
- Code committed to feature branch
- Branch pushed to GitHub
- Pull Request created

Example branch name:

```
feature/appointment-manager
```

---

## 👨‍💻 Author

**Muhammad Umer Rafaqat**

---

✅ Assignment 4 completed successfully.
