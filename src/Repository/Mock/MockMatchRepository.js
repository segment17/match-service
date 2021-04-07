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

  async SetupAddMatches(matches) {
    matches.forEach(match => {
      this.matches.push(match);
    });
  }

  /* checkAttributes(fullName, birthDate, height, weight) {
    if(fullName === "") {
      return false;
    }

    if(birthDate === "") {
      return false;
    }

    if(height && height <= 0) {
      return false;
    }

    if(weight && weight <= 0) {
      return false;
    }

    return true;
  }

  async runQueryForGetBoxerWithId(id) {
    console.log("Mock read from Boxer mock data with id: " + id);
    for (let i = 0; i < this.boxers.length; i++) {
      const element = this.boxers[i];
      if (element.id == id) {
        return {
          code: 200,
          message: "success",
          boxer: element
        };
      }
    }
    return {
      code: 404,
      message: "not_found",
      boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
    };
  }

  async runQueryForAddBoxerWithGivenData(fullName, birthDate, height, weight) {
    let newBoxerId = this.boxers[this.boxers.length - 1].id + 1;
    let newBoxer = {
      id: newBoxerId,
      fullName: fullName,
      birthDate: birthDate,
      height: height,
      weight: weight
    }
    if(!this.checkAttributes(fullName, birthDate, height, weight)) {
      newBoxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 };
      return {
        code: 400,
        message: "bad_request",
        boxer: newBoxer
      };
    }
    this.boxers.push(newBoxer);
    return {
      code: 201,
      message: "created",
      boxer: newBoxer
    };
  }

  async runQueryForEditBoxerWithGivenData(id, fullName, birthDate, height, weight) {
    let editedBoxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
    let index = null;
    for (let i in this.boxers) {
      if(this.boxers[i].id === id) {
        editedBoxer = this.boxers[i];
        index = i;
      }
    }
    if(index) {
      if(this.checkAttributes(fullName, birthDate, height, weight)) {
        editedBoxer = {
          id: id,
          fullName: fullName ? fullName : editedBoxer.fullName,
          birthDate: birthDate ? birthDate : editedBoxer.birthDate,
          height: height ? height : editedBoxer.height,
          weight: weight ? weight : editedBoxer.weight
        }
        this.boxers[index] = editedBoxer;
        return {
          code: 201,
          message: "edited",
          boxer: editedBoxer
        };
      }
      this.boxers[index] = editedBoxer;
      return {
        code: 400,
        message: "bad_request",
        boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
      };
    }
    this.boxers[index] = editedBoxer;
    return {
      code: 404,
      message: "not_found",
      boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
    };
  }

  async runQueryForRemoveBoxerWithId(id) {
    let removedBoxer = { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
    for (let index in this.boxers) {
      if(this.boxers[index].id === id) {
        removedBoxer = this.boxers[index];
        this.boxers.splice(index, 1);
      }
    }
    if(removedBoxer.id === 0) {
      return {
        code: 404,
        message: "not_found",
        boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 }
      };
    }
    return {
      code: 201,
      message: "removed",
      boxer: removedBoxer
    };
  }

  async setupAddBoxer(boxer) {
    this.boxers.push(boxer);
    return null;
  }

  async setupAddLatest(boxer) {
    this.setupAddBoxer(boxer);
    return null;
  } */
}

module.exports = MockMatchRepository;
