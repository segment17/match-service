@Integration @Gateway @BoxerServiceGateway
Feature: Boxer Service Gateway Integration Feature

  #SUCCESS SCENARIOS

  @Unit_BoxerServiceGateway_Scenario1 @B1 @B4
  Scenario Outline: Get boxer from Boxer Service Gateway
    Given there are boxers such as "<boxers>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                    | gateway_function | boxer_id                                    | expected_data                                    |
      | Unit_BoxerServiceGateway_Scenario1.boxers | getBoxer         | Unit_BoxerServiceGateway_Scenario1.boxer_id | Unit_BoxerServiceGateway_Scenario1.expected_data |

  #FAIL SCENARIOS

  @Unit_BoxerServiceGateway_Scenario1_Fail @B1 @B4
  Scenario Outline: Get boxer from Boxer Service Gateway - Fail
    Given there are boxers such as "<boxers>"
    When "<gateway_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | boxers                                         | gateway_function | boxer_id                                         | expected_data                                         |
      | Unit_BoxerServiceGateway_Scenario1_Fail.boxers | getBoxer         | Unit_BoxerServiceGateway_Scenario1_Fail.boxer_id | Unit_BoxerServiceGateway_Scenario1_Fail.expected_data |
