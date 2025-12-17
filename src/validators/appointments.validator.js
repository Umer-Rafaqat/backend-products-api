exports.validateAppointment = (req, res, next) => {
  const { customerId, serviceName, appointmentDate } = req.body;

  if (!customerId) {
    return res.status(400).json({ message: "customerId is required" });
  }

  if (!serviceName) {
    return res.status(400).json({ message: "serviceName is required" });
  }

  if (!appointmentDate || isNaN(Date.parse(appointmentDate))) {
    return res
      .status(400)
      .json({ message: "appointmentDate must be a valid date" });
  }

  next();
};
