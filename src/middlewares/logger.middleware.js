import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Request logs
    new winston.transports.File({
      filename: "Request.log",
      level: "info",
    }),

    // Error logs
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

export default logger;