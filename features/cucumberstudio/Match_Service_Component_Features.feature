@Component
Feature: Match Service Component Features


  @H1 @H1_Scenario1
  Scenario Outline: Get All Matches (1) (<hiptest-uid>)
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | boxers | matches | endpoint | expected_response | hiptest-uid |
      | H1_Scenario1_Variation1.boxers | H1_Scenario1_Variation1.matches | GetAllMatches | H1_Scenario1_Variation1.expected_response | uid:ad1b52ce-bd42-46df-954d-288715f7cae2 |

  @B1 @B1_Scenario1
  Scenario Outline: Get Matches Of Boxer (1) (<hiptest-uid>)
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers | matches | endpoint | request_body | expected_response | hiptest-uid |
      | B1_Scenario1_Variation1.boxers | B1_Scenario1_Variation1.matches | GetMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response | uid:d3a6a14d-e61b-4d01-aaf9-a57cf8640357 |

  @M3 @M3_Scenario1
  Scenario Outline: Edit Match (1) (<hiptest-uid>)
    Given there are boxers such as "<boxers>"
    And there is a match such as "<match>"
    And there is a token such as "<token>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers | match | token | endpoint | request_body | expected_response | hiptest-uid |
      | M3_Scenario1_Variation1.boxers | M3_Scenario1_Variation1.match | M3_Scenario1_Variation1.token | UpdateMatch | M3_Scenario1_Variation1.request_body | M3__Scenario1_Variation1.expected_response | uid:cc20382f-7134-45cd-a69a-f2dcf0a3471e |
