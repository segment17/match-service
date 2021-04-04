@Unit @Gateway @BoxerServiceGateway
Feature: Boxer Service Gateway Unit Feature


  @Unit_BoxerServiceGateway_Scenario1
  Scenario Outline: Get boxer from Boxer Service Gateway (<hiptest-uid>)
    Given there is a boxer such as "<boxer>"
    When "<gateway_function>" is invoked with "boxer_id"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer | gateway_function | boxer_id | expected_data | hiptest-uid |
      | Unit_BoxerServiceGateway_Scenario1.boxer | getBoxer | Unit_BoxerServiceGateway_Scenario1.boxer_id | Unit_BoxerServiceGateway_Scenario1.expected_data | uid:f420224f-a3d4-4d0f-b909-1fe64e21eedc |

  @Unit_BoxerServiceGateway_Scenario2
  Scenario Outline: Get boxer from Boxer Service Gateway (1) (<hiptest-uid>)
    Given there is a boxer such as "<boxer>"
    When "<gateway_function>" is invoked with "boxer_id"
    Then returned data is as "<expected_data>"

    Examples:
      | boxer | gateway_function | boxer_id | expected_data | hiptest-uid |
      | Unit_BoxerServiceGateway_Scenario2.boxer | getBoxer | Unit_BoxerServiceGateway_Scenario2.boxer_id | Unit_BoxerServiceGateway_Scenario2.expected_data | uid:482acbb2-f7cc-4977-a4e6-990fc15d5932 |
