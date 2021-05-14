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

  responseObject({ code, message }) {
    return {
      code,
      message,
    };
  }

  handleException(exception) {
        
    switch (exception.name) {
      case 'InvalidArgument':
        return this.responseObject({ code: 400, message: 'bad_request' });
      case 'NotFound':
        return this.responseObject({ code: 404, message: exception.message });
      default:
        return this.responseObject({ code: 500, message: exception.message });
    }
  }

  async addMatch(request) {
        const { homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxerId, token } = request;
    // Authentication validation
    const authValidation = await this.getAuthValidation(token);
    if (authValidation.code !== 200) {
      return this.responseObject(authValidation);
    }

    // Home boxer validation
    const homeBoxerValidation = await this.boxerServiceGateway.getBoxer(homeBoxerId);
    if (homeBoxerValidation.code !== 200) {
      return this.responseObject(homeBoxerValidation);
    }

    // Away boxer validation
    const awayBoxerValidation = await this.boxerServiceGateway.getBoxer(awayBoxerId);
    if (awayBoxerValidation.code !== 200) {
      return this.responseObject(awayBoxerValidation);
    }

    // Add match to DB
    try {
      const result = await this.matchRepository.addMatchWithGivenData({

        awayBoxerId,
        homeBoxerId,
        isFinished,
        matchTime,
        winnerBoxerId,
      });

      return {
        ...this.responseObject({ code: 201, message: 'created' }),
        ...result
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  async removeMatch(request) {
    const { id: matchId, token } = request;

    // Authentication validation
    const authValidation = await this.getAuthValidation(token);
    if (authValidation.code !== 200) {
      return this.responseObject(authValidation);
    }

    // Remove match from DB
    try {
      const match = await this.matchRepository.removeMatchById(matchId);

      return {
        ...this.responseObject({ code: 200, message: 'deleted' }),
        match
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  async getMatchesOfBoxer(request) {
    const { boxerId } = request;

    // Home boxer validation
    const boxerValidation = await this.boxerServiceGateway.getBoxer(boxerId);
    if (boxerValidation.code !== 200) {
      return this.responseObject(boxerValidation);
    }

    // Remove match from DB
    try {
      const matches = await this.matchRepository.getMatchesOfBoxer(boxerId);

      return {
        ...this.responseObject({ code: 200, message: 'success' }),
        matches,
        boxer: boxerValidation.boxer,
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  async removeMatchesOfBoxer(request) {
    const { boxerId, token } = request;

    // Authentication validation
    const authValidation = await this.getAuthValidation(token);
    if (authValidation.code !== 200) {
      return this.responseObject(authValidation);
    }

    // Home boxer validation
    const boxerValidation = await this.boxerServiceGateway.getBoxer(boxerId);
    if (boxerValidation.code !== 200) {
      return this.responseObject(boxerValidation);
    }

    // Remove match from DB
    try {
      const matches = await this.matchRepository.removeMatchesOfBoxer(boxerId);

      return {
        ...this.responseObject({ code: 200, message: 'deleted' }),
        matches
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  async updateMatch(request) {
    const { id, homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxerId, token } = request;
    const updatedMatch = { id, homeBoxerId, awayBoxerId, matchTime, isFinished, winnerBoxerId };

    // Authentication validation
    const authValidation = await this.getAuthValidation(token);
    if (authValidation.code !== 200) {
      return this.responseObject(authValidation);
    }

    // Home boxer validation
    if (homeBoxerId) {
      const homeBoxerValidation = await this.boxerServiceGateway.getBoxer(homeBoxerId);
      if (homeBoxerValidation.code !== 200) {
        return this.responseObject(homeBoxerValidation);
      }
    }

    if (awayBoxerId) {
      // Away boxer validation
      const awayBoxerValidation = await this.boxerServiceGateway.getBoxer(awayBoxerId);
      if (awayBoxerValidation.code !== 200) {
        return this.responseObject(awayBoxerValidation);
      }
    }

    // Update match
    try {
      const match = await this.matchRepository.updateMatch(updatedMatch);

      return {
        ...this.responseObject({ code: 200, message: 'updated' }),
        match
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  async getAllMatches(request) {
    // Remove match from DB
    try {
      const matches = await this.matchRepository.getAllMatches();

      return {
        ...this.responseObject({ code: 200, message: 'success' }),
        matches
      }
    } catch (error) {
      return this.handleException(error);
    }
  }

  // Mock everything.
  mock() {
    this.boxerServiceGateway = new MockBoxerServiceGateway();
    this.authServiceGateway = new MockAuthServiceGateway();
    this.matchRepository = new MockMatchRepository();
  }

}

module.exports = Mediator;
