// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '../../../proto/authservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const authservice_package = grpc.loadPackageDefinition(packageDefinition).authservice_package;
// GRPC SETUP

class AuthServiceGateway {

  // Gateway exposed function
  async getValidation(token) {
    let response = await this.doCallForGetValidation(token);
    return response;
  }

  async doCallForGetValidation(obj) {
    // Connect to Kubernetes if possible
    this.client = new authservice_package.AuthService((process.env.AUTH_SERVICE_SERVICE_HOST || '0.0.0.0') + ':' + (process.env.AUTH_SERVICE_SERVICE_PORT || '50001'), grpc.credentials.createInsecure());
    let response = await this.PROMISE_doCallForGetValidation(obj);
    return response;
  }

  async PROMISE_doCallForGetValidation (obj) {
    return new Promise((resolve, _) => {
      this.client.Validate({token: obj}, function (_, res) {
        resolve(res);
      });
    });
  }

  async setupAddAdmin(obj) {
    // TODO :: Discuss
    return null;
  }
}

module.exports = AuthServiceGateway;
