const Controller = require('./src/Controller');
const Mediator = require('./src/Mediator');
const BoxerServiceGateway = require('./src/Gateway/BoxerServiceGateway');
const MockBoxerServiceGateway = require('./src/Gateway/Mock/MockBoxerServiceGateway');
const AuthServiceGateway = require('./src/Gateway/AuthServiceGateway');
const MockAuthServiceGateway = require('./src/Gateway/Mock/MockAuthServiceGateway');
const EmailServiceGateway = require('./src/Gateway/EmailServiceGateway');
const MockEmailServiceGateway = require('./src/Gateway/Mock/MockEmailServiceGateway');
const MatchRepository = require('./src/Repository/MatchRepository');
const MockMatchRepository = require('./src/Repository/Mock/MockMatchRepository');

// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/proto/matchservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const matchservice_package = grpc.loadPackageDefinition(packageDefinition).matchservice_package;
// GRPC SETUP

class GlobalObjects {

  constructor() {
    this.done = false;
    this.result = null; // Result object that will be filled during tests.
    this.controller = new Controller();
    this.mediator = new Mediator();
    this.boxerServiceGateway = new BoxerServiceGateway();
    this.authServiceGateway = new AuthServiceGateway();
    this.emailServiceGateway = new EmailServiceGateway();
    this.matchRepository = new MatchRepository();

    // Connect to Kubernetes if possible
    if (process.env.MATCH_SERVICE_SERVICE_PORT != undefined) {
      this.client = new matchservice_package.MatchService("0.0.0.0" + ":" + process.env.MATCH_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
    } else {
      this.client = new matchservice_package.MatchService("0.0.0.0:50001", grpc.credentials.createInsecure());
    }
  }

  // Mock everything...
  mock() {
    this.result = null; // Result object that will be filled during tests.
    this.mediator.mock();
    this.boxerServiceGateway = new MockBoxerServiceGateway();
    this.authServiceGateway = new MockAuthServiceGateway();
    this.emailServiceGateway = new MockEmailServiceGateway();
    this.matchRepository = new MockMatchRepository();
  }

  setScenario(scenario) {
    this.scenario = scenario;
  }

  setScenarioTester(scenarioTester) {
    this.scenarioTester = scenarioTester;
  }

  reset() {
    this.result = null; // Result object that will be filled during tests.
    this.controller = new Controller();
    this.mediator = new Mediator();
    this.boxerServiceGateway = new BoxerServiceGateway();
    this.authServiceGateway = new AuthServiceGateway();
    this.emailServiceGateway = new EmailServiceGateway();

    // Connect to Kubernetes if possible
    if (process.env.MATCH_SERVICE_SERVICE_PORT != undefined) {
      this.client = new matchservice_package.MatchService("0.0.0.0" + ":" + process.env.MATCH_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
    } else {
      this.client = new matchservice_package.MatchService("0.0.0.0:50001", grpc.credentials.createInsecure());
    }
  }

}

module.exports = GlobalObjects;
