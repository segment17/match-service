@Unit @Gateway @AuthServiceGateway
Feature: Auth Service Gateway Unit Feature


  @Unit_AuthServiceGateway_Scenario1
  Scenario Outline: Get validation from Auth Service Gateway (<hiptest-uid>)
    Given there is a token such as "<token>"
    When "<gateway_function>" is invoked with "<data_chunk>"
    Then returned data is as "<expected_data>"

    Examples:
      | token | gateway_function | data_chunk | expected_data | hiptest-uid |
      | Unit_AuthServiceGateway_Scenario1.token | getValidation | Unit_AuthServiceGateway_Scenario1.data_chunk | Unit_AuthServiceGateway_Scenario1.expected_data | uid:b3358b1b-5488-4d3c-b32b-e5feea9d4628 |

  @Unit_AuthServiceGateway_Scenario2
  Scenario Outline: Get validation from Auth Service Gateway failure (<hiptest-uid>)
    Given there is a token such as "<token>"
    When "<gateway_function>" is invoked with "<data_chunk>"
    Then returned data is as "<expected_data>"

    Examples:
      | token | gateway_function | data_chunk | expected_data | hiptest-uid |
      | Unit_AuthServiceGateway_Scenario2_Fail1.token | getValidation | Unit_AuthServiceGateway_Scenario2_Fail1.data_chunk | Unit_AuthServiceGateway_Scenario2_Fail1.expected_data | uid:3abbf64e-886e-4106-8d97-4f9a4d7fa7fb |
