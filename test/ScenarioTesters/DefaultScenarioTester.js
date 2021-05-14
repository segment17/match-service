const TestFunctions = require('../TestFunctions');
const globalObjects = require('../../index');
const assert = require('assert');

class DefaultScenarioTester {

  constructor(scenario) {
    this.scenario = scenario;
  }

  get shouldMock () {
    return !TestFunctions.isScenarioE2E(this.scenario) && !TestFunctions.isScenarioIntegration(this.scenario);
  }

  // Special Before Scenario Function
  before() {
    globalObjects.setScenario(this.scenario);
    if (this.shouldMock) {
      // If it's not E2E or Integration, it means everything is mocked.
      globalObjects.mock();
      globalObjects.client.Mock({}, (err, res) => {
        globalObjects.done = true;
      });
    } else {
      globalObjects.reset();
      globalObjects.done = true;
    }
  }

  endpointIsCalledWithRequestBody(endpoint, requestBodySource) {

    const requestBody = TestFunctions.extractSpecifiedObjectData(requestBodySource);
    
    assert(requestBody !== undefined);
    assert(endpoint !== undefined);
    switch (endpoint) {
      case 'GetStandingAndMatchesOfBoxer':
      case 'GetMatchesOfBoxer':
      case 'AddMatch':
      case 'RemoveMatch':
      case 'RemoveMatchesOfBoxer':
      case 'UpdateMatch':
        globalObjects.client[endpoint](requestBody, function (err, res) {
          globalObjects.result = res;
        });
        break;
      default:
        console.log("Endpoint not found!");
        assert(false);
        break;
    }
  }

  endpointIsCalled(endpoint) {
    assert(endpoint != undefined);
    switch (endpoint) {
      case 'GetAllMatches':
        globalObjects.client[endpoint](null, function (err, res) {
          globalObjects.result = res;
        });
        break;
      default:
        console.log("Endpoint not found!");
        assert(false);
    }
  }

  compareBoxers(actual, expected) {
    assert(actual.id == expected.id);
    assert(actual.fullName == expected.fullName);
    assert(actual.birthDate == expected.birthDate);
    assert(actual.height == expected.height);
    assert(actual.weight == expected.weight);
  }

  compareStandings(actual, expected) {
    for(let index in expected) {
      this.compareBoxers(actual[index].boxer, expected[index].boxer);
      assert(actual[index].winCount == expected[index].winCount);
      assert(actual[index].lossCount == expected[index].lossCount);
      assert(actual[index].score == expected[index].score);
    }
  }

  compareMatches(actual, expected) {
    for(let index in expected) {
      assert(actual[index].homeBoxerId === expected[index].homeBoxerId);
      assert(actual[index].awayBoxerId === expected[index].awayBoxerId);
      assert(actual[index].id === expected[index].id);
      assert(actual[index].matchTime == expected[index].matchTime);
      assert(actual[index].isFinished === expected[index].isFinished);
      assert(actual[index].height === expected[index].height);
    }
  }

  async responseIsAs(expectedResponseSource) {
    const expectedResponse = TestFunctions.extractSpecifiedObjectData(expectedResponseSource);
        await TestFunctions.waitUntilResult();

    const response = globalObjects.result;
        assert.strictEqual(response.code, expectedResponse.code);
    assert.strictEqual(response.message,  expectedResponse.message);
    if(expectedResponse.standings) {
      this.compareStandings(response.standings.sort((a, b) => a.boxer.id - b.boxer.id), expectedResponse.standings.sort((a, b) => a.boxer.id - b.boxer.id));
    }
    if(expectedResponse.boxer) {
      this.compareBoxers(response.boxer, expectedResponse.boxer);
    }
    if (expectedResponse.matches) {
      this.compareMatches(response.matches, expectedResponse.matches);
    }
    if (expectedResponse.standingAndMatches) {
      assert(JSON.stringify(response.standingAndMatches.matches.sort()) == JSON.stringify(expectedResponse.standingAndMatches.matches.sort()));
      assert(JSON.stringify(response.standingAndMatches.standing) == JSON.stringify(response.standingAndMatches.standing));
    }
  }

  async thereIsAnAdminSuchAs(dataSource) {
    const specified = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddAdmin({admin: specified}, function (err, res) {
      globalObjects.done = true;
    });
  }

  async thereIsAMatchSuchAs(dataSource) {
    const match = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddMatches([match]);
  }

  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddMatches({matches: matches}, function (err, res) {
      globalObjects.done = true;
    });
  }

  async thereIsABoxerSuchAs(dataSource) {
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddBoxers({boxers: [specifiedBoxer]}, function (err, res) {
      globalObjects.done = true;
    });
  }

  async thereAreBoxersSuchAs(dataSource) {
    const boxers = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.client.SetupAddBoxers({boxers: boxers}, function (err, res) {
      globalObjects.done = true;
    });
  }

  assertionsForDBHasMatchSuchAs(expected, actual) {
    assert(actual != null);
    assert(expected.id == actual.id);
    assert(expected.homeBoxerId == actual.homeBoxerId);
    assert(expected.awayBoxerId == actual.awayBoxerId);
    assert(expected.matchTime == actual.matchTime);
    assert(expected.winnerBoxerId == actual.winnerBoxerId);
    assert(expected.isFinished == actual.isFinished);
  }
}

module.exports = DefaultScenarioTester;