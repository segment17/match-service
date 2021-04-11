class MatchRepository {

  async addMatchWithGivenData(matchData) {
    let queryResult = await this.runQueryForAddMatchWithGivenData(matchData);
    return queryResult;
  }

  async getMatchById(matchData) {
    let queryResult = await this.runQueryForGetMatchById(matchData);
    return queryResult;
  }

  async removeMatchById(matchData) {
    let queryResult = await this.runQueryForRemoveMatchById(matchData);
    return queryResult;
  }

  async removeMatchesOfBoxer(boxerId) {
    let queryResult = await this.runQueryForRemoveMatchesOfBoxer(boxerId);
    return queryResult;
  }

  async updateMatch(match) {
    let queryResult = await this.runQueryForUpdateMatch(match);
    return queryResult;
  }

  async getAllMatches() {
    let queryResult = await this.runQueryForGetAllMatches();
    return queryResult;
  }

  async getMatchesOfBoxer(boxerId) {
    let queryResult = await this.runQueryForGetMatchesOfBoxer(boxerId);
    return queryResult;
  }

  async runQueryForAddMatchWithGivenData(matchData) {
    console.log("Real AddMatch query to DB with given data");
    return {};
  }

  async runQueryForGetMatchById(matchData) {
    console.log("Real GetMatchById query to DB with given data");
    return {};
  }

  async runQueryForRemoveMatchById(matchData) {
    console.log("Real RemoveMatchById query to DB with given data");
    return {};
  }

  async runQueryForRemoveMatchesOfBoxer(matchData) {
    console.log("Real RemoveMatchesOfBoxer query to DB with given data");
    return {};
  }

  async runQueryForUpdateMatch(matchData) {
    console.log("Real UpdateMatch query to DB with given data");
    return {};
  }

  async runQueryForGetAllMatches() {
    console.log("Real GetAllMatches query to DB with given data");
    return [];
  }

  async runQueryForGetMatchesOfBoxer() {
    console.log("Real GetMatchesOfBoxer query to DB with given data");
    return [];
  }

  async SetupAddMatches(matches) {
    console.log('matches: ', matches);
  }
}

module.exports = MatchRepository;
