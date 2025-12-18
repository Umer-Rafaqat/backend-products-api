const { db } = require("../config/firebase");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { generateToken } = require("../utils/jwtUtils");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

const register = async (req, res) => {
  try {
    const validation = validateRegister(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await db
      .collection("users")
      .where("email", "==", email.toLowerCase())
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Email already registered"],
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in Firestore
    const docRef = await db.collection("users").add({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role.toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate JWT token
    const token = generateToken(
      docRef.id,
      email.toLowerCase(),
      role.toLowerCase()
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: docRef.id,
        name,
        email: email.toLowerCase(),
        role: role.toLowerCase(),
        createdAt: new Date(),
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const validation = validateLogin(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.errors,
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email.toLowerCase())
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({
        error: "Authentication failed",
        details: ["Invalid email or password"],
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Compare passwords
    const isPasswordValid = await comparePassword(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Authentication failed",
        details: ["Invalid email or password"],
      });
    }

    // Generate JWT token
    const token = generateToken(userDoc.id, userData.email, userData.role);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};

module.exports = { register, login };
