const MatchRepository = require('../MatchRepository');

class MockMatchRepository extends MatchRepository {

  constructor() {
    super();
    this.matches = [];
  }

  async runQueryForAddMatchWithGivenData(matchData) {
    this.matches.push(matchData);
    return { affectedRows: 1 };
  }

  async runQueryForGetMatchById(matchData) {
    const matches = this.matches.filter(match => match.id === matchData);
    if (!matches || !matches.length) {
      return [];
    }

    return matches;
  }

  async runQueryForRemoveMatchById(matchData) {
    let removedMatches = [];
    let filteredMatches = [];
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.id === matchData) {
        removedMatches.push(match);
      } else {
        filteredMatches.push(match);
      }
    }

    this.matches = filteredMatches;
    return { affectedRows: removedMatches.length };
  }

  async runQueryForRemoveMatchesOfBoxer(boxerId) {
    let removedMatches = [];
    let filteredMatches = [];
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.homeBoxerId === boxerId || match.awayBoxerId === boxerId) {
        removedMatches.push(match);
      } else {
        filteredMatches.push(match);
      }
    }

    this.matches = filteredMatches;
    return { affectedRows: removedMatches.length };
  }

  async runQueryForUpdateMatch(updatedMatch) {
    let _updatedMatches = [];
    let _matches = [];
    for (let i = 0; i < this.matches.length; i++) {
      let match = this.matches[i];
      if (match.id === updatedMatch.id) {
        _updatedMatches.push({
          ...match,
          ...updatedMatch
        });
      }

      _matches.push(match);
    }

    this.matches = _matches;
    return { affectedRows: _updatedMatches.length };
  }

  async runQueryForGetAllMatches() {
    if (!this.matches || !this.matches.length) {
      return [];
    }

    return this.matches;
  }

  async runQueryForGetMatchesOfBoxer(boxerId) {
    let filteredMatches = [];
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.homeBoxerId === boxerId || match.awayBoxerId === boxerId) {
        filteredMatches.push(match);
      }
    }

    return filteredMatches;
  }

  async SetupAddMatches(matches) {
    matches.forEach(match => {
      this.matches.push(match);
    });
  }
}

module.exports = MockMatchRepository;
