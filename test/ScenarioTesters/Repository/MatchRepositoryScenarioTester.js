const globalObjects = require('../../..');
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const assert = require('assert');

class MatchRepositoryScenarioTester extends DefaultScenarioTester {

  unitFunctionIsInvokedWithData(unitFunctionName, invocationDataSource) {
    const data = TestFunctions.extractSpecifiedObjectData(invocationDataSource);
    switch (unitFunctionName) {
      case 'addMatchWithGivenData':
      case 'getMatchById':
        globalObjects.mediator.matchRepository[unitFunctionName](data).then(d => {
          globalObjects.result = d;
        });
        break;
      default:
        assert(false);
        break;
    }
  }

  async dbHasMatchSuchAs(dataSource) {
    const expected = TestFunctions.extractSpecifiedObjectData(dataSource);
    const { id: matchId } = expected;
    let response = await globalObjects.matchRepository.getMatchById(matchId);
    this.assertionsForDBHasMatchSuchAs(expected, response);
  }

  async returnedDataIsAs(dataSource) {
    const expectedData = TestFunctions.extractSpecifiedObjectData(dataSource);
    await TestFunctions.waitUntilResult();
    // Or separate checks

    const { id, homeBoxer: { id: homeBoxerId }, awayBoxer: { id: awayBoxerId }, matchTime, isFinished } = globalObjects.result;

    if (!homeBoxerId || !awayBoxerId || !matchTime || isFinished === undefined) {
      assert(false);
    }

    assert.strictEqual(id, expectedData.id);
    assert.strictEqual(homeBoxerId, expectedData.homeBoxer.id);
    assert.strictEqual(awayBoxerId, expectedData.awayBoxer.id);
    assert.strictEqual(matchTime, expectedData.matchTime);
    assert.strictEqual(isFinished, expectedData.isFinished);
  }

  /* thereIsAnActiveStandingSpecifiedAsData(dataSource) {
    console.log("mediator.BoxerServiceGateway is getting mock data.")
    const specifiedStanding = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.mediator.BoxerServiceGateway.SetupAddStanding(specifiedStanding);
  }

  thereIsABoxerSpecifiedAsData(dataSource) {
    console.log("mediator.BoxerRepository is getting mock data.")
    const specifiedBoxer = TestFunctions.extractSpecifiedObjectData(dataSource);
    globalObjects.mediator.BoxerRepository.SetupAddGreeeting(specifiedBoxer);
  } */


}

module.exports = MatchRepositoryScenarioTester;