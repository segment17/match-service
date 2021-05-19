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

    return { affectedRows };
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
    if (!removedMatches || removedMatches.affectedRows !== 1) {
      throw new NotFound('match_not_found');
    }

    return removedMatches;
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

    const { id, awayBoxerId, homeBoxerId, matchTime, isFinished, winnerBoxer } = match;
    if (id === undefined || id < 1) {
      throw new InvalidArgument('match.id cannot be empty');
    }
    if (!homeBoxerId && !awayBoxerId && !matchTime && !isFinished && !winnerBoxer) {
      throw new InvalidArgument('match cannot be empty');
    }

    const updatedMatches = await this.runQueryForUpdateMatch(match);
    if (!updatedMatches || updatedMatches.affectedRows < 1) {
      throw new NotFound('match_not_found');
    }

    return updatedMatches;
  }

  async getAllMatches() {
    const allMatches = await this.runQueryForGetAllMatches();
    return allMatches;
  }

  async getMatchesOfBoxer(boxerId) {
    if (!boxerId) {
      throw new InvalidArgument('boxerId cannot be empty');
    }

    const matches = await this.runQueryForGetMatchesOfBoxer(boxerId);
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

  async runQueryForRemoveMatchById(matchId) {
    const deleteQuery = this.createDeleteQuery({ matchId });
    return await this.runQuery(deleteQuery);
  }

  async runQueryForRemoveMatchesOfBoxer(boxerId) {
    const deleteQuery = this.createDeleteQuery({ boxerId });
    return await this.runQuery(deleteQuery);
  }

  async runQueryForUpdateMatch(match) {
    const updateQuery = this.createUpdateQuery(match);
    return await this.runQuery(updateQuery);
  }

  async runQueryForGetAllMatches() {
    return await this.runQuery(`SELECT * FROM ${this.tableName};`);
  }

  async runQueryForGetMatchesOfBoxer(boxerId) {
    const getQuery = this.createGetQuery({ boxerId });
    return await this.runQuery(getQuery);
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

  createDeleteQuery({ matchId, boxerId }) {
    if (!matchId && !boxerId) { return {}; }
    let query = `DELETE FROM ${this.tableName} WHERE `;
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

  createUpdateQuery(match) {
    const { id, homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxer } = match;

    let query = `UPDATE ${this.tableName} SET `;
    if (homeBoxerId) {
      query = `${query} homeBoxerId = '${homeBoxerId}'`;
    }
    if (awayBoxerId) {
      if (homeBoxerId) {
        query = `${query},`;
      }
      query = `${query} awayBoxerId = '${awayBoxerId}'`;
    }
    if (matchTime) {
      if (homeBoxerId || awayBoxerId) {
        query = `${query},`;
      }
      query = `${query} matchTime = '${matchTime}'`;
    }
    if (isFinished) {
      if (homeBoxerId || awayBoxerId || matchTime) {
        query = `${query},`;
      }
      query = `${query} isFinished = '${isFinished}'`;
    }
    if (winnerBoxer) {
      if (homeBoxerId || awayBoxerId || matchTime || isFinished) {
        query = `${query},`;
      }
      query = `${query} winnerBoxer = '${winnerBoxer}'`;
    }

    return `${query} WHERE id = '${id}';`;
  }

  createInsertQuery(match) {
    const { id, awayBoxerId, homeBoxerId, matchTime, winnerBoxerId, isFinished } = match;
    if (id == undefined) {
      let query = `INSERT INTO ${this.tableName} (homeBoxerId, awayBoxerId, matchTime, isFinished${winnerBoxerId ? ', winnerBoxerId' : ''})`;
      let fq = query + ` VALUES (${homeBoxerId}, ${awayBoxerId}, ${matchTime}, ${isFinished}${winnerBoxerId ? `, ${winnerBoxerId}` : ''});`
      return fq;
    } else {
      let query = `INSERT INTO ${this.tableName} (id, homeBoxerId, awayBoxerId, matchTime, isFinished${winnerBoxerId ? ', winnerBoxerId' : ''})`;
      let fq = query + ` VALUES (${id}, ${homeBoxerId}, ${awayBoxerId}, ${matchTime}, ${isFinished}${winnerBoxerId ? `, ${winnerBoxerId}` : ''});`
      return fq;
    }
  }
}

module.exports = MatchRepository;
