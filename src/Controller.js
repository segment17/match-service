const Mediator = require('./Mediator');

// Endpoint guards: guard[endpoint name]
class Controller {

  constructor() {
    this.mediator = new Mediator();
  }

  async guardAddMatch(request) {
    const { homeBoxerId, awayBoxerId, matchTime, isFinished, token } = request;
    if (!(homeBoxerId && awayBoxerId && matchTime !== '0' && token !== '')) {
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
    const { id, homeBoxerId, awayBoxerId, matchTime, token, winnerBoxerId } = request;
    if (winnerBoxerId == 0) {
      request.winnerBoxerId = null;
    }
    if (id === 0 || !(matchTime !== '0' || token !== '' || homeBoxerId || awayBoxerId)) {
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
