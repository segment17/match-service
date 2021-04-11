const MatchRepository = require('../MatchRepository');

class MockMatchRepository extends MatchRepository {

  constructor() {
    super();
    this.matches = [];
  }

  async runQueryForAddMatchWithGivenData(matchData) {
    if (!matchData) {
      throw Error("Can't insert match data.");
    }
    const index = this.matches.length || 0;
    this.matches.push(matchData);
    return this.matches[index];
  }

  async runQueryForGetMatchById(matchData) {
    if (!matchData) {
      throw Error("Can't find match data.");
    }

    const match = this.matches.filter(match => match.id === matchData);
    if (!match || !match.length) {
      throw Error("Can't find match data.");
    }

    return match[0];
  }

  async runQueryForRemoveMatchById(matchData) {
    if (!matchData || !this.matches || !this.matches.length) {
      throw Error("Can't find match data.");
    }

    let removedMatch;
    let filteredMatches = [];
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.id === matchData) {
        removedMatch = match;
      } else {
        filteredMatches.push(match);
      }
    }

    if (removedMatch === undefined) {
      throw Error("Can't find match data.");
    }

    this.matches = filteredMatches;
    return removedMatch;
  }

  async runQueryForRemoveMatchesOfBoxer(boxerId) {
    if (!boxerId || !this.matches || !this.matches.length) {
      throw Error("Can't find match data.");
    }

    let removedMatches = [];
    let filteredMatches = [];
    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.homeBoxer.id === boxerId || match.awayBoxer.id === boxerId) {
        removedMatches.push(match);
      } else {
        filteredMatches.push(match);
      }
    }

    this.matches = filteredMatches;
    return removedMatches;
  }

  async runQueryForUpdateMatch(updatedMatch) {
    if (!updatedMatch) {
      throw Error("Bad operation.");
    }

    if (!this.matches) {
      throw Error("DB has gone away.");
    }

    if (!this.matches.length) {
      throw Error("Match not found.");
    }

    let _updatedMatch;
    let _matches = [];
    for (let i = 0; i < this.matches.length; i++) {
      let match = this.matches[i];
      if (match.id === updatedMatch.id) {
        _updatedMatch = {
          ...match,
          ...updatedMatch
        }
        match = _updatedMatch;
      }

      _matches.push(match);
    }

    this.matches = _matches;
    return _updatedMatch;
  }

  async runQueryForGetAllMatches() {
    if (!this.matches) {
      throw Error("DB has gone away.");
    }

    return this.matches;
  }

  async runQueryForGetMatchesOfBoxer(boxerId) {
    if (!this.matches) {
      throw Error("DB has gone away.");
    }

    let filteredMatches = [];

    for (let i = 0; i < this.matches.length; i++) {
      const match = this.matches[i];
      if (match.homeBoxer.id === boxerId || match.awayBoxer.id === boxerId) {
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
