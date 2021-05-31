// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '../../../proto/ubc.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const ubc_package = grpc.loadPackageDefinition(packageDefinition).ubc_package;
// GRPC SETUP

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
class AuthServiceGateway {

  // Gateway exposed function
  async getValidation(token) {
    let response = await this.doCallForGetValidation(token);
    return response;
  }

  async doCallForGetValidation(obj) {
    // Connect to Kubernetes if possible
    await sleep(50);
    console.log('🔵AuthService.Validate🔵\t:: ', obj.substring(0,30));
    this.client = new ubc_package.AuthService((process.env.AUTH_SERVICE_ADDR || '0.0.0.0:50051'), grpc.credentials.createInsecure());
    let response = await this.PROMISE_doCallForGetValidation(obj);
    await sleep(50);
    console.log('🟣AuthService.Validate🟣\t:: ', JSON.stringify(response));
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
