const AuthServiceGateway = require('./Gateway/AuthServiceGateway');
const BoxerServiceGateway = require('./Gateway/BoxerServiceGateway');
const MockAuthServiceGateway = require('./Gateway/Mock/MockAuthServiceGateway');
const MockBoxerServiceGateway = require('./Gateway/Mock/MockBoxerServiceGateway');
const MatchRepository = require('./Repository/MatchRepository');
const MockMatchRepository = require('./Repository/Mock/MockMatchRepository');

class Mediator {

  constructor() {
    this.boxerServiceGateway = new BoxerServiceGateway();
    this.authServiceGateway = new AuthServiceGateway();
    this.matchRepository = new MatchRepository();
  }

  // Endpoints

  async getAuthValidation(token) {
    const response = await this.authServiceGateway.getValidation(token);
    return response;
  }

  getErrorObject(validationResponse) {
    return {
      code: validationResponse.code,
      message: validationResponse.message,
      match: {
        id: -1,
        homeBoxerId: -1,
        awayBoxerId: -1,
        matchTime: -1,
        isFinished: false,
        winnerBoxerId: -1
      }
    };
  }

  calculateStandingOfBoxer(matches, boxer) {
    let wins = 0;
    let losses = 0;
    for(let index in matches) {
      const match = matches[index];
      if(match.isFinished) {
        if(match.winnerBoxer.id === boxer.id) {
          wins++;
        } else {
          if(match.homeBoxer.id === boxer.id || match.awayBoxer.id === boxer.id) {
            losses++;
          }
        }
      }
    }
    let score = wins / (wins + losses);
    return { boxer: boxer.id === 0 ? null : boxer, winCount: wins, lossCount: losses, score: score ? score : 0 };
  }

  extractBoxersFromMatches(matches) {
    let boxers = [];
    let boxer_ids = [];
    for(let index in matches) {
      const away = matches[index].awayBoxer;
      const home = matches[index].homeBoxer;
      if(!boxer_ids.includes(away.id)) {
        boxer_ids.push(away.id);
        boxers.push(away);
      }
      if(!boxer_ids.includes(home.id)) {
        boxer_ids.push(home.id);
        boxers.push(home);
      }
    }
    return boxers;
  }

  async getStandingAndMatchesOfBoxer(id) {
    const response = await this.boxerServiceGateway.getMatchesOfBoxer(id);
    const standing = this.calculateStandingOfBoxer(response.matches, response.boxer);

    return {
      code: response.code,
      message: response.message,
      boxer: response.boxer,
      standingAndMatches: {
        standing: standing,
        matches: response.matches
      }
    };
  }

  async getAllStandings() {
    const response = await this.boxerServiceGateway.getAllMatches();
    const matches = response.matches;
    let boxers = this.extractBoxersFromMatches(matches);
    let standings = [];
    for(let index in boxers) {
      standings.push(this.calculateStandingOfBoxer(matches, boxers[index]));
    }

    return {
      code: response.code,
      message: response.message,
      standings: standings
    };
  }

  async addMatch(request) {
    const { homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxerId, token } = request;
    // Authentication validation
    const authValidation = await this.getAuthValidation(token);
    if(authValidation.code !== 200) {
      return this.getErrorObject(authValidation);
    }

    // Home boxer validation
    const homeBoxerValidation = await this.boxerServiceGateway.getBoxerWithStandingAndMatches(homeBoxerId);
    if (homeBoxerValidation.code !== 200) {
      return this.getErrorObject(homeBoxerValidation);
    }

    // Away boxer validation
    const awayBoxerValidation = await this.boxerServiceGateway.getBoxerWithStandingAndMatches(awayBoxerId);
    if (awayBoxerValidation.code !== 200) {
      return this.getErrorObject(awayBoxerValidation);
    }

    // Add match to DB
    try {
      await this.matchRepository.addMatchWithGivenData({
        awayBoxerId,
        homeBoxerId,
        isFinished,
        matchTime,
        winnerBoxerId,
      });
    } catch (error) {
      return this.getErrorObject({
        code: 500,
        message: error.message,
      });
    }
  }

  async setupAddMatches(matches) {
    await this.matchRepository.SetupAddMatches(matches);
  }

  // Mock everything.
  mock() {
    this.boxerServiceGateway = new MockBoxerServiceGateway();
    this.authServiceGateway = new MockAuthServiceGateway();
    this.matchRepository = new MockMatchRepository();
  }

}

module.exports = Mediator;
