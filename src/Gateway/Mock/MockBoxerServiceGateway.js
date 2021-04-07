const BoxerServiceGateway = require('../BoxerServiceGateway');

class MockBoxerServiceGateway extends BoxerServiceGateway {
  
  constructor() {
    super();
    this.matchesList = [];
    this.boxersList = [];
  }
  
  async doCallForGetBoxerWithStandingAndMatches(param) {
    const notFoundObject = {
      code: 404,
      message: "boxer_not_found",
      boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 },
      standingAndMatches: []
    };
    if (!this.boxersList) {
      return notFoundObject;
    }

    const boxer = this.boxersList.filter(boxer => boxer.id === param);
    if (!boxer) {
      return notFoundObject;
    }

    return {
      code: 200,
      message: 'success',
      boxer,
      standingAndMatches: []
    } ;
  }

  async doCallForGetMatchesOfBoxer(param) {
    let boxer = null;
    let matches = [];
    for(let index in this.boxersList) {
      const temp = this.boxersList[index];
      if(temp.id === param) {
        boxer = temp;
      }
    }
    if(!boxer) {
      return {
        code: 404,
        message: "not_found",
        boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 },
        matches: []
      }
    }
    for(let index in this.matchesList) {
      const match = this.matchesList[index];
      if(match.awayBoxer.id === boxer.id || match.homeBoxer.id === boxer.id) {
        matches.push(match);
      }
    }
    return {
      code: 200,
      message: "success",
      boxer: boxer,
      matches: matches
    }
  }

  async doCallForGetAllMatches() {
    return {
      code: 200,
      message: "success",
      matches: this.matchesList
    }
  }

  async SetupAddMatches(obj) {
    for(let index in obj) {
      this.matchesList.push(obj[index]);
    }
    return;
  }

  async SetupAddBoxer(obj) {
    this.boxersList.push(obj);
    return;
  }

  async SetupAddBoxers(obj) {
    for(let index in obj) {
      this.boxersList.push(obj[index]);
    }
    return;
  }
}

module.exports = MockBoxerServiceGateway;
