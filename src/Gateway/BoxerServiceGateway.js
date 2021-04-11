class BoxerServiceGateway {

  // Gateway exposed function
  async getMatchesOfBoxer(param) {
    let response = await this.doCallForGetMatchesOfBoxer(param);
    return response;
  }

  async getAllMatches() {
    let response = await this.doCallForGetAllMatches();
    return response;
  }

  async getBoxer(boxerId) {
    let response = await this.doCallForGetBoxer(boxerId);
    return response;
  }

  async doCallForGetBoxer(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async doCallForGetMatchesOfBoxer(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async doCallForGetAllMatches(param) {
    console.log("Real get call to AnyService with param: " + param);
    return {}; //TODO
  }

  async SetupAddMatches(obj) {
    return null;
  }

  async SetupAddBoxer(obj) {
    console.log("DENEME");
    console.log(obj);
    return null;
  }

  async SetupAddBoxers(obj) {
    console.log("DENEME");
    console.log(obj);
    return null;
  }

  extractMatchesFromResponse(response) {
    //TODO Parse response here...
    return response.matches;
  }

}

module.exports = BoxerServiceGateway;
