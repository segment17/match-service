const AuthServiceGateway = require('../AuthServiceGateway');

class MockAuthServiceGateway extends AuthServiceGateway {

  constructor() {
    super();
    this.admin = null;
  }

  async doCallForGetValidation(obj) {
    if (obj.substring(0, 2) === 'ey') {
      return {
        code: 200,
        message: "success"
      }
    }
    return {
      code: 403,
      message: "forbidden"
    }
  }

  async setupAddAdmin(obj) {
    this.admin = obj;
    return null;
  }
}

module.exports = MockAuthServiceGateway;
