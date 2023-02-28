const express = require("express");
const createPrometheusMiddleware = require("express-prometheus-middleware");
const winston = require('winston');
const expressWinston = require('express-winston');
const LokiTransport = require("winston-loki");
const app = express();

app.use(
  createPrometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: process.env.LOKI_HOST || "http://127.0.0.1:3100",
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
  ),
}))

app.get("/loops", (req, res) => {
  for (let i = 0; i < 1000; i++) {}

  res.status(200).end();
})

app.get("/long-times", (req, res) => {
  setTimeout(() => {
    res.status(200).end()
  }, 2000)
})

app.listen(process.env.PORT || "3000");
