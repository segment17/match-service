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

  async SetupAddBoxer(obj) {
    console.log(obj);
    return null;
  }

  async doCallForGetBoxer(obj) {
    // Connect to Kubernetes if possible
    if (this.client == undefined || this.client == null) {
      if (process.env.BOXER_SERVICE_SERVICE_PORT != undefined) {
        this.client = new boxerservice_package.BoxerService(process.env.BOXER_SERVICE_SERVICE_HOST + ":" + process.env.BOXER_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
      } else {
        this.client = new boxerservice_package.BoxerService("0.0.0.0:50001", grpc.credentials.createInsecure());
      }
    }

    console.log(this.client);

    let response = await this.PROMISE_doCallForGetBoxer(obj);
    console.log(response);

    return response;
  }

  async PROMISE_doCallForGetBoxer (obj) {
    return new Promise((resolve, reject) => {
      this.client.GetBoxer({id: obj}, function (err, res) {
        console.log(res);
        resolve(res);
      });
    });
  }


  async SetupAddBoxers(obj) {
    console.log(obj);
    return null;
  }
}

module.exports = BoxerServiceGateway;
