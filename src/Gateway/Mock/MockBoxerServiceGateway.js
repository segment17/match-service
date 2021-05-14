const BoxerServiceGateway = require('../BoxerServiceGateway');

class MockBoxerServiceGateway extends BoxerServiceGateway {
  
  constructor() {
    super();
    this.boxersList = [];
  }
  
  async doCallForGetBoxer(param) {
    const notFoundObject = {
      code: 404,
      message: "not_found",
      boxer: { id: 0, fullName: '', birthDate: '0', height: 0, weight: 0 },
    };
    if (!this.boxersList) {
      return notFoundObject;
    }

    const boxers = this.boxersList.filter(boxer => boxer.id === param);
    if (boxers.length === 0) {
      return notFoundObject;
    }

    return {
      code: 200,
      message: 'success',
      boxer: boxers[0],
    } ;
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
