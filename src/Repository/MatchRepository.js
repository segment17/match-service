class MatchRepository {

  /* async getBoxerWithId(id) {
    let queryResult = await this.runQueryForGetBoxerWithId(id);
    return queryResult;
  }

  // runQueryFor[function name]
  async runQueryForGetBoxerWithId(id) {
    console.log("Real read query to Boxer DB with id: " + id);
    return {};
  }

  async addBoxerWithGivenData(fullName, birthDate, height, weight) {
    // Mysql insert returns the lastest id
    let queryResult = await this.runQueryForAddBoxerWithGivenData(fullName, birthDate, height, weight);
    return queryResult;
  }

  async runQueryForAddBoxerWithGivenData(fullName, birthDate, height, weight) {
    console.log("Real write query to Boxer DB with: " + fullName + birthDate + height + weight);
    return {};
  }

  async editBoxerWithGivenData(id, fullName, birthDate, height, weight) {
    // Mysql insert returns the lastest id
    let queryResult = await this.runQueryForEditBoxerWithGivenData(id, fullName, birthDate, height, weight);
    return queryResult;
  }

  async runQueryForEditBoxerWithGivenData(id, fullName, birthDate, height, weight) {
    console.log("Real write query to Boxer DB with: " + id + fullName + birthDate + height + weight);
    return {};
  }

  async removeBoxerWithId(id) {
    // Mysql insert returns the lastest id
    let queryResult = await this.runQueryForRemoveBoxerWithId(id);
    return queryResult;
  }

  async runQueryForRemoveBoxerWithId(id) {
    console.log("Real remove query to Boxer DB with id: " + id);
    return {};
  }

  async setupAddGreeeting(boxer) {
    return null;
  }

  async setupAddLatest(boxer) {
    console.log("Real write query for mock data to Boxer DB with id: " + id);
    return;
  } */
}

module.exports = MatchRepository;
