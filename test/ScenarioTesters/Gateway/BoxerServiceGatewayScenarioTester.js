
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class BoxerServiceGatewayScenarioTester extends DefaultScenarioTester {
  unitFunctionIsInvokedWithData(functionName, dataSource) {
    const specifiedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    switch (functionName) {
      case 'getBoxer':
        globalObjects.boxerServiceGateway[functionName](specifiedData).then(r => {
          globalObjects.result = r;
        })
        break;
      default:
        break;
    }
  }

  endpointIsCalledWithRequestBody(endpoint, requestBodySource) {
    const requestBody = TestFunctions.extractSpecifiedObjectData(requestBodySource);
    assert(requestBody !== undefined);
    assert(endpoint !== undefined);
    switch (endpoint) {
      case 'GetBoxer':
      case 'SetupAddBoxer':
        globalObjects.boxerServiceGateway[endpoint](requestBody, function (err, res) {
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
    if(expectedResponse.boxer) {
      this.compareBoxers(response.boxer, expectedResponse.boxer);
    }
  }

  async thereIsABoxerSuchAs(dataSource) {
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.boxerServiceGateway.SetupAddBoxer(specifiedBoxer);
    globalObjects.done = true;
  }

  async thereAreBoxersSuchAs(dataSource) {
    const boxers = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.boxerServiceGateway.SetupAddBoxers(boxers);
    globalObjects.done = true;
  }

  async returnedDataIsAs(dataSource) {
    const expectedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    await TestFunctions.waitUntilResult();

    const { code: expectedCode, message: expectedMessage, boxer: expectedBoxer } = expectedData;
    const { code: resultCode, message: resultMessage, boxer: resultBoxer } = globalObjects.result;

    assert(expectedCode === resultCode);
    assert(expectedMessage === resultMessage);
    if(expectedBoxer) {
      assert(JSON.stringify(expectedBoxer) === JSON.stringify(resultBoxer));
    }
  }
}

module.exports = BoxerServiceGatewayScenarioTester;
