const Mediator = require('./Mediator');

class Controller {

  constructor() {
    this.mediator = new Mediator();
  }

  // Endpoint guards: guard[endpoint name]
  async guardGetStandingAndMatchesOfBoxer(request) {
    // Do validation here
    let response = await this.mediator.getStandingAndMatchesOfBoxer(request.boxerId);
    // Do validation here
    return response;
  }

  async guardGetAllStandings() {
    // Do validation here

    let response = await this.mediator.getAllStandings();
    // Do validation here
    return response;
  }

  async guardAddMatch(request) {
    const { homeBoxerId, awayBoxerId, matchTime, isFinished, token } = request;

    if (homeBoxerId === 0
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
    // Do validation here

    let response = await this.mediator.addMatch(request);
    // Do validation here
    return response;
  }

  async guardRemoveMatch(request) {

    // Do validation here

    let response = await this.mediator.removeMatch(request);
    // Do validation here
    return response;
  }

  async guardRemoveMatchesOfBoxer(request) {

    // Do validation here

    let response = await this.mediator.removeMatchesOfBoxer(request);
    // Do validation here
    return response;
  }

  async guardUpdateMatch(request) {

    // Do validation here

    let response = await this.mediator.updateMatch(request);
    // Do validation here
    return response;
  }

  async guardGetAllMatches(request) {

    // Do validation here

    let response = await this.mediator.getAllMatches(request);
    // Do validation here
    return response;
  }

  async guardGetMatchesOfBoxer(request) {

    // Do validation here

    let response = await this.mediator.getMatchesOfBoxer(request);
    // Do validation here
    return response;
  }

  // Mock
  mock() {
    // Assign to mediator to mock everything it has.
    this.mediator.mock();
  }

}

module.exports = Controller;