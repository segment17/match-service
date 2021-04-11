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
