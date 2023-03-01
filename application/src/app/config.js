module.exports = {
  telemetry: {
    serviceName: process.env.TELEMETRY_SERVICE_NAME || 'notekeeper',
    url: process.env.TELEMETRY_URL || "http://localhost:4318/v1/traces",
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  security: {
    password: {
      saltRounds: Number(process.env.SECURITY_PASSWORD_SALT_ROUNDS || "10"),
    },
    session: {
      secret: process.env.SECURITY_SESSION_SECRET || "R643z]Gn*=&TbZV%",
      expiresIn: Number(process.env.SECURITY_SESSION_EXPIRES_IN || "3600"),
    },
  },
};
