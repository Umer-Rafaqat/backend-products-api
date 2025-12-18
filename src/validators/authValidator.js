const validateRegister = (data) => {
  const errors = [];

  // Validate name
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  } else if (data.name.length < 2) {
    errors.push("name must be at least 2 characters long");
  }

  // Validate email
  if (
    !data.email ||
    typeof data.email !== "string" ||
    data.email.trim() === ""
  ) {
    errors.push("email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("email must be a valid email format");
    }
  }

  // Validate password
  if (!data.password || typeof data.password !== "string") {
    errors.push("password is required");
  } else if (data.password.length < 6) {
    errors.push("password must be at least 6 characters long");
  }

  // Validate role
  if (!data.role || typeof data.role !== "string") {
    errors.push("role is required");
  } else if (!["admin", "staff"].includes(data.role.toLowerCase())) {
    errors.push('role must be either "admin" or "staff"');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validateLogin = (data) => {
  const errors = [];

  // Validate email
  if (
    !data.email ||
    typeof data.email !== "string" ||
    data.email.trim() === ""
  ) {
    errors.push("email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("email must be a valid email format");
    }
  }

  // Validate password
  if (!data.password || typeof data.password !== "string") {
    errors.push("password is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateRegister, validateLogin };
