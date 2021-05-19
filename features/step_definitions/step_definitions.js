const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const TestFunctions = require('../../test/TestFunctions');
const ScenarioTesterFactory = require('../../test/ScenarioTesters/ScenarioTesterFactory');
const globalObjects = require('../../index');

Before(async function (scenario) {
  await globalObjects.cleanUp();
  globalObjects.done = false;
  globalObjects.setScenarioTester(ScenarioTesterFactory.createScenarioTester(scenario));
  globalObjects.scenarioTester.before();
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('there are boxers such as {string}', async function (boxersDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereAreBoxersSuchAs(boxersDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

When('{string} is called with {string}', function (endpoint, requestBodySource) {
  globalObjects.scenarioTester.endpointIsCalledWithRequestBody(endpoint, requestBodySource);
});

When('{string} is called', function (endpoint) {
  globalObjects.scenarioTester.endpointIsCalled(endpoint);
});

Then('response is as {string}', async function (expectedResponse) {
  await globalObjects.scenarioTester.responseIsAs(expectedResponse);
});

Given('there are matches such as {string}', async function (matchesDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereAreMatchesSuchAs(matchesDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('there is a match such as {string}', async function (matcheDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsAMatchSuchAs(matcheDataSource);
});

Given('there is an admin such as {string}', async function (adminDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsAnAdminSuchAs(adminDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

When('{string} is invoked with {string}', function (unitFunctionName, invocationDataSource) {
  globalObjects.scenarioTester.unitFunctionIsInvokedWithData(unitFunctionName, invocationDataSource);
});

When('{string} is invoked', function (unitFunctionName) {
  globalObjects.scenarioTester.unitFunctionIsInvokedWithData(unitFunctionName, null);
});

Then('returned data is as {string}', async function (expectedDataSource) {
  await globalObjects.scenarioTester.returnedDataIsAs(expectedDataSource);
});

Then('DB has match such as {string}', async function (matchDataSource) {
  await globalObjects.scenarioTester.dbHasMatchSuchAs(matchDataSource);
});

Given('the latest match in DB is such as {string}', async function (matchesDataSource) {
  await globalObjects.scenarioTester.thereAreMatchesSuchAs(matchesDataSource);
});
