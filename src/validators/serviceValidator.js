const validateServiceCreate = (data) => {
  const errors = [];

  // Validate name
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  }

  // Validate price
  if (data.price === undefined || data.price === null) {
    errors.push("price is required");
  } else if (typeof data.price !== "number" || data.price <= 0) {
    errors.push("price must be a positive number");
  }

  // Validate duration
  if (!data.duration || typeof data.duration !== "number") {
    errors.push("duration is required and must be a number");
  } else if (data.duration <= 0) {
    errors.push("duration must be greater than 0 minutes");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateServiceCreate };
