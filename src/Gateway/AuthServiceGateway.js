class AuthServiceGateway {

  // Template code

  // Gateway exposed function
  async getValidation(token) {
    let response = await this.doCallForGetValidation(token);
    return response;
  }

  async doCallForGetValidation(obj) {
    // Connect to Kubernetes if possible
    if (this.client == undefined || this.client == null) {
      if (process.env.AUTH_SERVICE_SERVICE_PORT != undefined) {
        this.client = new authservice_package.AuthService(process.env.AUTH_SERVICE_SERVICE_HOST + ":" + process.env.AUTH_SERVICE_SERVICE_PORT, grpc.credentials.createInsecure());
      } else {
        this.client = new authservice_package.AuthService("0.0.0.0:50001", grpc.credentials.createInsecure());
      }
    }

    console.log(this.client);

    let response = await this.PROMISE_doCallForGetValidation(obj);
    console.log(response);

    return response;
  }

  async PROMISE_doCallForGetValidation (obj) {
    return new Promise((resolve, reject) => {
      this.client.Validate({token: obj}, function (err, res) {
        console.log(res);
        resolve(res);
      });
    });
  }

  async setupAddAdmin(obj) {
    return null;
  }
}

module.exports = AuthServiceGateway;
