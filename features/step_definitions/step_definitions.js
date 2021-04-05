const { Given, When, Then, Before } = require('@cucumber/cucumber');
const TestFunctions = require('../../test/TestFunctions');
const ScenarioTesterFactory = require('../../test/ScenarioTesters/ScenarioTesterFactory');
const globalObjects = require('../../index');

Before(async function (scenario) {
  globalObjects.done = false;
  globalObjects.setScenarioTester(ScenarioTesterFactory.createScenarioTester(scenario));
  globalObjects.scenarioTester.before();
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('{string} is running', function (serviceName) {
  globalObjects.scenarioTester.serviceIsRunning(serviceName);
});

Given('there is a boxer such as {string}', async function (boxerDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsABoxerSuchAs(boxerDataSource);
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

Given('there are matches such as {string}', function (matchesDataSource) {
  globalObjects.scenarioTester.thereAreMatchesSuchAs(matchesDataSource);
});

Given('there is a match such as {string}', function (matcheDataSource) {
  globalObjects.scenarioTester.thereIsAMatchSuchAs(matcheDataSource);
});

Given('there is a token such as {string}', async function (tokenDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsATokenSuchAs(tokenDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('there is an admin such as {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
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

Then('DB does not have match such as {string}', async function (matchDataSource) {
  await globalObjects.scenarioTester.dbHasNoMatchSuchAs(matchDataSource);
});