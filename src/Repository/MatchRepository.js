const { NotFound, InvalidArgument, DBOperationFailed } = require("../common/Errors");
const { connection } = require('./DB');

class MatchRepository {

  constructor() {
    this.tableName = 'matches';
    this.runQuery(this.createTableQuery);
  }

  get createTableQuery() {
    return `CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id INT NOT NULL AUTO_INCREMENT,
      homeBoxerId INT NOT NULL,
      awayBoxerId INT NOT NULL,
      matchTime BIGINT NOT NULL,
      isFinished BOOLEAN NOT NULL,
      winnerBoxerId INT,
      PRIMARY KEY (id)
    );`;
  }
  
  get cleanUpQuery() {
    return `DROP TABLE IF EXISTS ${this.tableName};`;
  }

  async cleanUp() {
    await this.runQuery(this.cleanUpQuery);
    await this.runQuery(this.createTableQuery);
  }

  async addMatchWithGivenData(matchData) {
    if (!matchData) {
      throw new InvalidArgument('matchData cannot be empty');
    }

    const { affectedRows } = await this.runQueryForAddMatchWithGivenData(matchData);
    if (affectedRows !== 1) {
      throw new DBOperationFailed('Match could not be inserted')
    }

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
    const insertQuery = this.createInsertQuery(matchData);
    return await this.runQuery(insertQuery);
  }

  async runQueryForGetMatchById(matchId) {
    const getQuery = this.createGetQuery({ matchId });
    return await this.runQuery(getQuery);
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
    return await this.runQuery(`SELECT * FROM ${this.tableName};`);
  }

  async runQueryForGetMatchesOfBoxer() {
    console.log("Real GetMatchesOfBoxer query to DB with given data");
    return [];
  }

  async runQuery(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      });
    });
  }

  async SetupAddMatches(matches) {
    await matches.forEach(async match => {
      await this.runQuery(this.createInsertQuery(match));
    });
  }

  createGetQuery({ matchId, boxerId }) {
    if (!matchId && !boxerId) { return {}; }
    let query = `SELECT * FROM ${this.tableName} WHERE `;
    if (matchId) {
      query = `${query} id = '${matchId}'`;
    }
    if (matchId && boxerId) {
      query = `${query} AND `;
    }
    if (boxerId) {
      query = `${query}awayBoxerId = '${boxerId}' OR homeBoxerId = '${boxerId}'`;
    }
    return `${query};`;
  }

  createInsertQuery(match) {
    const { id, homeBoxer, awayBoxer, matchTime, winnerBoxer, isFinished } = match;
    let query = `INSERT INTO ${this.tableName} (id, homeBoxerId, awayBoxerId, matchTime ,isFinished${winnerBoxer ? ', winnerBoxerId' : ''})`;
    return query + ` VALUES (${id}, ${homeBoxer.id}, ${awayBoxer.id}, ${matchTime}, ${isFinished}${winnerBoxer ? `, ${winnerBoxer.id}` : ''});`
  }
}

module.exports = MatchRepository;
