
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const globalObjects = require('../../..');
const assert = require('assert');

class BoxerServiceGatewayScenarioTester extends DefaultScenarioTester {
  unitFunctionIsInvokedWithData(functionName, dataSource) {
    const specifiedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    switch (functionName) {
      case 'getAllMatches':
      case 'getBoxerWithStandingAndMatches':
      case 'getMatchesOfBoxer':
        globalObjects.boxerServiceGateway[functionName](specifiedData).then(r => {
          globalObjects.result = r;
        })
        break;
      default:
        break;
    }
  }

  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.boxerServiceGateway.SetupAddMatches(matches);
    globalObjects.done = true;
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
      assert(JSON.stringify(expectedBoxer) === JSON.stringify(resultBoxer[0]));
    }
  }
}

module.exports = BoxerServiceGatewayScenarioTester;
