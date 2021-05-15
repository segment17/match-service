
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class AuthServiceGatewayScenarioTester extends DefaultScenarioTester {
  async thereIsAnAdminSuchAs(dataSource) {
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.authServiceGateway.setupAddAdmin(specified);
    globalObjects.done = true;
  }
  
  async unitFunctionIsInvokedWithData(functionName, dataSource) { 
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.authServiceGateway.getValidation(specified).then((data) => {
      globalObjects.result = data;
    });
  }

  async returnedDataIsAs(dataSource) { 
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    await TestFunctions.waitUntilResult();
    assert(JSON.stringify(specified) === JSON.stringify(globalObjects.result));
  }
}

module.exports = AuthServiceGatewayScenarioTester;
