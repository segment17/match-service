@Integration @Gateway @AuthServiceGateway
Feature: Auth Service Gateway Integration Feature

  #SUCCESS SCENARIOS

  @Unit_AuthServiceGateway_Scenario1
  Scenario Outline: Get validation from Auth Service Gateway
    Given there is an admin such as "<admin>"
    When "<gateway_function>" is invoked with "<data_chunk>"
    Then returned data is as "<expected_data>"

    Examples:
      | admin                                   | gateway_function | data_chunk                                   | expected_data                                   |
      | Unit_AuthServiceGateway_Scenario1.admin | getValidation    | Unit_AuthServiceGateway_Scenario1.data_chunk | Unit_AuthServiceGateway_Scenario1.expected_data |

  #FAIL SCENARIOS

  @Unit_AuthServiceGateway_Scenario2
  Scenario Outline: Get validation from Auth Service Gateway failure
    Given there is an admin such as "<admin>"
    When "<gateway_function>" is invoked with "<data_chunk>"
    Then returned data is as "<expected_data>"

    Examples:
      | admin                                         | gateway_function | data_chunk                                         | expected_data                                         |
      | Unit_AuthServiceGateway_Scenario2_Fail1.admin | getValidation    | Unit_AuthServiceGateway_Scenario2_Fail1.data_chunk | Unit_AuthServiceGateway_Scenario2_Fail1.expected_data |