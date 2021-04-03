class AuthServiceGateway {

  // Template code

  // Gateway exposed function
  async getValidation(token) {
    let response = await this.doCallForGetValidation(token);
    return response;
  }

  // doCallFor[function name]
  async doCallForGetValidation(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async setupToken(obj) {
    return null;
  }

}

module.exports = AuthServiceGateway;
