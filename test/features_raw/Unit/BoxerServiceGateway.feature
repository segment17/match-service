@Unit @Gateway @BoxerServiceGateway
Feature: Boxer Service Gateway Unit Feature

  #SUCCESS SCENARIOS

  @Unit_BoxerServiceGateway_Scenario1
  Scenario Outline: Get boxer from Boxer Service Gateway
    Given there is a boxer such as "<boxer>"
    When "<gateway_function>" is invoked with "boxer_id"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer                                    | gateway_function | boxer_id                                    | expected_data                                    |
      | Unit_BoxerServiceGateway_Scenario1.boxer | getBoxer         | Unit_BoxerServiceGateway_Scenario1.boxer_id | Unit_BoxerServiceGateway_Scenario1.expected_data |

  #FAIL SCENARIOS

  @Unit_BoxerServiceGateway_Scenario2
  Scenario Outline: Get boxer from Boxer Service Gateway
    Given there is a boxer such as "<boxer>"
    When "<gateway_function>" is invoked with "boxer_id"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer                                    | gateway_function | boxer_id                                    | expected_data                                    |
      | Unit_BoxerServiceGateway_Scenario2.boxer | getBoxer         | Unit_BoxerServiceGateway_Scenario2.boxer_id | Unit_BoxerServiceGateway_Scenario2.expected_data |
