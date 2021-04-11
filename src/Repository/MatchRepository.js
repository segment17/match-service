const { NotFound, InvalidArgument } = require("../common/Errors");

class MatchRepository {

  async addMatchWithGivenData(matchData) {
    if (!matchData) {
      throw new InvalidArgument('matchData cannot be empty');
    }

    await this.runQueryForAddMatchWithGivenData(matchData);
    return matchData;
  }

  async getMatchById(matchId) {
    if (!matchId) {
      throw new InvalidArgument('matchId cannot be empty');
    }

    const matches = await this.runQueryForGetMatchById(matchId);
    return matches[0];
  }

  async removeMatchById(matchId) {
    if (!matchId) {
      throw new InvalidArgument('matchId cannot be empty');
    }

    const removedMatches = await this.runQueryForRemoveMatchById(matchId);
    if (!removedMatches || !removedMatches.length) {
      throw new NotFound('match_not_found');
    }

    return removedMatches[0];
  }

  async removeMatchesOfBoxer(boxerId) {
    if (!boxerId) {
      throw new InvalidArgument('boxerId cannot be empty');
    }

    const removedMatches = await this.runQueryForRemoveMatchesOfBoxer(boxerId);
    return removedMatches;
  }

  async updateMatch(match) {
    if (!match) {
      throw new InvalidArgument('match cannot be empty');
    }

    if (!match.id) {
      throw new InvalidArgument('match.id cannot be empty');
    }

    const updatedMatches = await this.runQueryForUpdateMatch(match);
    if (!updatedMatches || !updatedMatches.length) {
      throw new NotFound('match_not_found');
    }

    return updatedMatches[0];
  }

  async getAllMatches() {
    const allMatches = await this.runQueryForGetAllMatches();
    return allMatches;
  }

  async getMatchesOfBoxer(boxerId) {
    if (!boxerId) {
      throw new InvalidArgument('boxerId cannot be empty');
    }

    const matches = await this.runQueryForRemoveMatchesOfBoxer(boxerId);
    return matches;
  }

  async runQueryForAddMatchWithGivenData(matchData) {
    console.log("Real AddMatch query to DB with given data");
    return [];
  }

  async runQueryForGetMatchById(matchData) {
    console.log("Real GetMatchById query to DB with given data");
    return [];
  }

  async runQueryForRemoveMatchById(matchData) {
    console.log("Real RemoveMatchById query to DB with given data");
    return [];
  }

  async runQueryForRemoveMatchesOfBoxer(matchData) {
    console.log("Real RemoveMatchesOfBoxer query to DB with given data");
    return [];
  }

  async runQueryForUpdateMatch(matchData) {
    console.log("Real UpdateMatch query to DB with given data");
    return [];
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
