// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '../../../proto/ubc.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const ubc_package = grpc.loadPackageDefinition(packageDefinition).ubc_package;
// GRPC SETUP

class BoxerServiceGateway {

  async getBoxer(boxerId) {
    let response = await this.doCallForGetBoxer(boxerId);
    return response;
  }

  async cleanUp () {
    return await this.doCallForSetupClearBoxers();
  }

  async SetupAddBoxers(obj) {
    for (let i in obj) {
      const boxer = obj[i];
      await this.doCallForSetupAddBoxer(boxer);
    }
  }

  async doCallForGetBoxer(obj) {
    // Connect to Kubernetes if possible
    this.client = new ubc_package.BoxerService((process.env.BOXER_SERVICE_SERVICE_HOST || '0.0.0.0') + ':' + (process.env.BOXER_SERVICE_SERVICE_PORT || '50002'), grpc.credentials.createInsecure());
    let response = await this.PROMISE_doCallForGetBoxer(obj);
    return response;
  }

  async PROMISE_doCallForGetBoxer (obj) {
    return new Promise((resolve, _) => {
      this.client.GetBoxer({id: obj}, function (_, res) {
        resolve(res);
      });
    });
  }

  async doCallForSetupAddBoxer(obj) {
    // Connect to Kubernetes if possible
    this.client = new ubc_package.BoxerService((process.env.BOXER_SERVICE_SERVICE_HOST || '0.0.0.0') + ':' + (process.env.BOXER_SERVICE_SERVICE_PORT || '50002'), grpc.credentials.createInsecure());
    let response = await this.PROMISE_doCallForSetupAddBoxer(obj);
    return response;
  }

  async PROMISE_doCallForSetupAddBoxer (obj) {
        return new Promise((resolve, _) => {
      this.client.SetupAddBoxer({boxer: obj}, function (_, res) {
        resolve(res);
      });
    });
  }


  async doCallForSetupClearBoxers() {
    // Connect to Kubernetes if possible
    this.client = new ubc_package.BoxerService((process.env.BOXER_SERVICE_SERVICE_HOST || '0.0.0.0') + ':' + (process.env.BOXER_SERVICE_SERVICE_PORT || '50002'), grpc.credentials.createInsecure());
    let response = await this.PROMISE_doCallForSetupClearBoxers();
    return response;
  }

  async PROMISE_doCallForSetupClearBoxers () {
    return new Promise((resolve, _) => {
      this.client.SetupClearBoxers({}, function (_, res) {
        resolve(res);
      });
    });
  }
}

module.exports = BoxerServiceGateway;
