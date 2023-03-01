const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");

const config = require("../config");

module.exports = {
  start() {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    const sdk = new opentelemetry.NodeSDK({
      serviceName: config.telemetry.serviceName,
      traceExporter: new OTLPTraceExporter({
        url: config.telemetry.url,
        headers: {},
      }),
      instrumentations: [getNodeAutoInstrumentations()],
    });

    return sdk.start();
  },
};
