const winston = require("winston");

const { createLogger, format, transports } = winston;

const customPrintFormat = format.printf(
  ({ level, message, label = "server", timestamp }) =>
    `${timestamp} | ${level.padEnd(5)} - [${label}] : "${message}"`
);

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),

    // Allows for logging Error instances
    // Ex: logger.warn(new Error('Error passed as info'));
    format.errors({ stack: true }),

    // Allows for string interpolation
    // Ex: logger.info('Found %s at %s', 'error', new Date());
    format.splat(),

    // Allows for JSON logging
    // Ex: logger.log({ level: 'info', message: 'Pass an object' });
    format.json(),

    customPrintFormat
  ),
  transports: [
    // Write all logs with level `debug` to the `console`
    new transports.Console({
      format: format.combine(format.colorize(), customPrintFormat),
    }),
  ],
});

module.exports = logger;
module.exports.stream = {
  write: (message) => logger.http(message.replace(/\n$/, "")),
};
