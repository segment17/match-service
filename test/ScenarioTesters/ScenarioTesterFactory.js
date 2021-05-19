const DefaultScenarioTester = require('./DefaultScenarioTester');
const BoxerServiceGatewayScenarioTester = require('./Gateway/BoxerServiceGatewayScenarioTester');
const AuthServiceGatewayScenarioTester = require('./Gateway/AuthServiceGatewayScenarioTester');
const MatchRepositoryScenarioTester = require('./Repository/MatchRepositoryScenarioTester');
const TestFunctions = require('../TestFunctions');

class ScenarioTesterFactory {

  static createScenarioTester(scenario) {
    if (TestFunctions.isScenarioUnit(scenario, "BoxerServiceGateway") || TestFunctions.isScenarioIntegration(scenario, "BoxerServiceGateway")) {
      return new BoxerServiceGatewayScenarioTester(scenario);
    } else if (TestFunctions.isScenarioUnit(scenario, "AuthServiceGateway") || TestFunctions.isScenarioIntegration(scenario, "AuthServiceGateway")) {
      return new AuthServiceGatewayScenarioTester(scenario);
    } else if (TestFunctions.isScenarioUnit(scenario, "MatchRepository") || TestFunctions.isScenarioIntegration(scenario, "MatchRepository")) {
      return new MatchRepositoryScenarioTester(scenario);
    }

    return new DefaultScenarioTester(scenario);
  }

}

module.exports = ScenarioTesterFactory;
