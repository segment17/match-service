const BoxerServiceGateway = require('./Gateway/BoxerServiceGateway');
const MockBoxerServiceGateway = require('./Gateway/Mock/MockBoxerServiceGateway');

class Mediator {

  constructor() {
    this.boxerServiceGateway = new BoxerServiceGateway();
  }

  // Endpoints

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
    const { homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxerId } = request;
    // const response = await this.boxerServiceGateway.getAllMatches();
    // const matches = response.matches;
    // let boxers = this.extractBoxersFromMatches(matches);
    // let standings = [];
    // for(let index in boxers) {
    //   standings.push(this.calculateStandingOfBoxer(matches, boxers[index]));
    // }

    // return {
    //   code: response.code,
    //   message: response.message,
    //   standings: standings
    // };
  }

  // Mock everything.
  mock() {
    this.boxerServiceGateway = new MockBoxerServiceGateway();
  }

}

module.exports = Mediator;
