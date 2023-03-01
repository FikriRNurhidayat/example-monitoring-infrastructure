const opentelemetry = require("./infrastructures/opentelemetry");

opentelemetry.start();

const cors = require("cors");
const fs = require("fs");
const path = require("path");
const winston = require("winston");
const LokiTransport = require("winston-loki");
const express = require("express");
const expressPrometheusMiddleware = require("express-prometheus-middleware");
const expressWinston = require("express-winston");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const featuresDir = path.join(__dirname, "..", "features");
const infrastucturesDir = path.join(__dirname, "infrastructures");

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  expressPrometheusMiddleware({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new LokiTransport({
        host: process.env.LOKI_HOST || "http://127.0.0.1:3100",
        labels: {
          app: process.env.LOKI_APP || "notekeeper",
        },
      }),
    ],
    format: winston.format.combine(winston.format.json()),
  })
);

app.bootstrap = async function bootstrap() {
  const infrastructures = fs.readdirSync(infrastucturesDir).filter((infrastructureFileName) => infrastructureFileName != 'opentelemetry.js');
  const features = fs.readdirSync(featuresDir, { withFileTypes: true });

  await Promise.all(
    infrastructures.map((infrastructurePath) => {
      const infra = require(path.join(infrastucturesDir, infrastructurePath));
      return infra.start();
    })
  );

  features.forEach((feature) => {
    if (!feature.isDirectory()) return;

    const routerPath = path.join(featuresDir, feature.name, "router.js");
    if (!fs.existsSync(routerPath)) return;

    const router = require(routerPath);
    app.use(router);
  });

  app.use(require("./middlewares/handleRouteNotFound"));
  app.use(require("./middlewares/handleException"));
};

module.exports = app;
