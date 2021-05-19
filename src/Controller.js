const Mediator = require('./Mediator');

// Endpoint guards: guard[endpoint name]
class Controller {

  constructor() {
    this.mediator = new Mediator();
  }

  async guardGetStandingAndMatchesOfBoxer(request) {
    let response = await this.mediator.getStandingAndMatchesOfBoxer(request.boxerId);
    return response;
  }

  async guardGetAllStandings() {
    let response = await this.mediator.getAllStandings();
    return response;
  }

  async guardAddMatch(request) {
    const { homeBoxerId, awayBoxerId, matchTime, isFinished, token } = request;

    if (homeBoxerId <= 0
      || awayBoxerId <= 0
      || matchTime <= '0'
      // || isFinished === false // Idk how to check if this value exists
      || token === ''
    ) {
      return {
        code: 400,
        message: 'bad_request'
      }
    }

    let response = await this.mediator.addMatch(request);
    return response;
  }

  async guardRemoveMatch(request) {
    let response = await this.mediator.removeMatch(request);
    return response;
  }

  async guardRemoveMatchesOfBoxer(request) {
    const { boxerId } = request;

    if (boxerId <= 0) {
      return {
        code: 400,
        message: 'bad_request'
      }
    }

    let response = await this.mediator.removeMatchesOfBoxer(request);
    return response;
  }

  async guardUpdateMatch(request) {
    const { id, homeBoxerId, awayBoxerId, matchTime, isFinished, token } = request;
    if (id === 0
      || homeBoxerId === 0
      || awayBoxerId === 0
      || matchTime === '0'
      // || isFinished === false // Idk how to check if this value exists
      || token === ''
    ) {
      return {
        code: 400,
        message: 'bad_request'
      }
    }
    let response = await this.mediator.updateMatch(request);
    return response;
  }

  async guardGetAllMatches(request) {
    let response = await this.mediator.getAllMatches(request);
    return response;
  }

  async guardGetMatchesOfBoxer(request) {
    let response = await this.mediator.getMatchesOfBoxer(request);
    return response;
  }

  // Assign to mediator to mock everything it has.
  mock() {
    this.mediator.mock();
  }

}

module.exports = Controller;
