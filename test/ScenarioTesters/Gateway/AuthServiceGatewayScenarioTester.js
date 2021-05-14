
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class AuthServiceGatewayScenarioTester extends DefaultScenarioTester {

  endpointIsCalledWithRequestBody(endpoint, requestBodySource) {
    const requestBody = TestFunctions.extractSpecifiedObjectData(requestBodySource);
    assert(requestBody !== undefined);
    assert(endpoint !== undefined);
    switch (endpoint) {
      case 'Validate':
        globalObjects.authServiceGateway[endpoint](requestBody, function (err, res) {
          globalObjects.result = res;
        });
        break;
      default:
        console.log("Endpoint not found!");
        assert(false);
        break;
    }
  }

  async responseIsAs(expectedResponseSource) {
    const expectedResponse = TestFunctions.extractSpecifiedObjectData(expectedResponseSource);
    await TestFunctions.waitUntilResult();

    const response = globalObjects.result;
    assert.strictEqual(response.code, expectedResponse.code);
    assert.strictEqual(response.message,  expectedResponse.message);
  }

  async thereIsAnAdminSuchAs(dataSource) {
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.authServiceGateway.setupAddAdmin(specified);
    globalObjects.done = true;
  }
  
  async unitFunctionIsInvokedWithData(functionName, dataSource) { 
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.authServiceGateway.Validate(specified).then((data) => {
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
