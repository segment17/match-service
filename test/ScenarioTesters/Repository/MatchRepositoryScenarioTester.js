const globalObjects = require('../../..');
const DefaultScenarioTester = require('../DefaultScenarioTester');
const TestFunctions = require('../../TestFunctions');
const assert = require('assert');

class MatchRepositoryScenarioTester extends DefaultScenarioTester {

  unitFunctionIsInvokedWithData(unitFunctionName, invocationDataSource) {
    const data = invocationDataSource ? TestFunctions.extractSpecifiedObjectData(invocationDataSource) : null;
    switch (unitFunctionName) {
      case 'addMatchWithGivenData':
      case 'getAllMatches':
      case 'getMatchById':
      case 'getMatchesOfBoxer':
      case 'removeMatchById':
      case 'removeMatchesOfBoxer':
      case 'updateMatch':
        globalObjects.matchRepository[unitFunctionName](data).then(d => {
          globalObjects.result = d;
        }).catch(err => {
          globalObjects.result = err;
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
    const { affectedRows } = expectedData;
    await TestFunctions.waitUntilResult();
    // Or separate checks

    const result = globalObjects.result;
    const isResultError = result instanceof Error;
    if (affectedRows) {
      assert.strictEqual(affectedRows, result.affectedRows);
    }
    else if (isResultError) {
      assert.strictEqual(expectedData.name, result.name);
      assert.strictEqual(expectedData.message, result.message);
    } else {
      const isResultArray = Array.isArray(result);
      if (isResultArray) {
        for (let index = 0; index < result.length; index++) {
          const r = result[index];
          const e = expectedData[index];

          const { id, homeBoxerId, awayBoxerId, matchTime, isFinished } = r;

          if (!homeBoxerId || !awayBoxerId || !matchTime || isFinished === undefined) {
            assert(false);
          }

          assert.strictEqual(id, e.id);
          assert.strictEqual(homeBoxerId, e.homeBoxerId);
          assert.strictEqual(awayBoxerId, e.awayBoxerId);
          assert.strictEqual(matchTime, e.matchTime);
          assert.strictEqual(!!isFinished, !!e.isFinished);
        }
      } else {
        const { id, homeBoxerId, awayBoxerId, matchTime, isFinished } = result;

        if (!homeBoxerId || !awayBoxerId || !matchTime || isFinished === undefined) {
          assert(false);
        }

        assert.strictEqual(id, expectedData.id);
        assert.strictEqual(homeBoxerId, expectedData.homeBoxerId);
        assert.strictEqual(awayBoxerId, expectedData.awayBoxerId);
        assert.strictEqual(matchTime, expectedData.matchTime);
        assert.strictEqual(!!isFinished, !!expectedData.isFinished);
      }
    }
  }

  async thereIsAMatchSuchAs(dataSource) {
    const match = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.matchRepository.SetupAddMatches([match]);
  }

  async thereAreMatchesSuchAs(dataSource) {
    const matches = TestFunctions.extractSpecifiedObjectData(dataSource);
    await globalObjects.matchRepository.SetupAddMatches(matches, function (err, res) {
      globalObjects.done = true;
    });
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