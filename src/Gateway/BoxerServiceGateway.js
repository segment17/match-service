// GRPC SETUP
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '../../../proto/boxerservice.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });
const boxerservice_package = grpc.loadPackageDefinition(packageDefinition).boxerservice_package;
// GRPC SETUP

class BoxerServiceGateway {

  async getBoxer(boxerId) {
    let response = await this.doCallForGetBoxer(boxerId);
    return response;
  }

  async doCallForGetBoxer(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async SetupAddBoxer(obj) {
    console.log(obj);
    return null;
  }

  async SetupAddBoxers(obj) {
    console.log(obj);
    return null;
  }
}

module.exports = BoxerServiceGateway;
