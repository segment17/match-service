@Component
Feature: Match Service Component Features

  #SUCCESS SCENARIOS

  @H1 @H1_Scenario1
  Scenario Outline: Get All Matches
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | endpoint      | expected_response                         |
      | H1_Scenario1_Variation1.boxers | H1_Scenario1_Variation1.matches | GetAllMatches | H1_Scenario1_Variation1.expected_response |

  @B1 @B1_Scenario1
  Scenario Outline: Get Matches Of Boxer
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | endpoint          | request_body                         | expected_response                         |
      | B1_Scenario1_Variation1.boxers | B1_Scenario1_Variation1.matches | GetMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response |

  @M3 @M3_Scenario1
  Scenario Outline: Edit Match
    Given there are boxers such as "<boxers>"
    And there is a match such as "<match>"
    And there is a token such as "<token>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | match                         | token                         | endpoint    | request_body                         | expected_response                          |
      | M3_Scenario1_Variation1.boxers | M3_Scenario1_Variation1.match | M3_Scenario1_Variation1.token | UpdateMatch | M3_Scenario1_Variation1.request_body | M3__Scenario1_Variation1.expected_response |

  #FAIL SCENARIOS

  @H1 @H1_Scenario2
  Scenario Outline: Get All Matches
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | boxers                    | matches                    | endpoint      | expected_response                    |
      | H1_Scenario2_Fail1.boxers | H1_Scenario2_Fail1.matches | GetAllMatches | H1_Scenario2_Fail1.expected_response |

  @B1 @B1_Scenario2
  Scenario Outline: Get Matches Of Boxer
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                    | matches                    | endpoint          | request_body                    | expected_response                    |
      | B1_Scenario2_Fail1.boxers | B1_Scenario2_Fail1.matches | GetMatchesOfBoxer | B1_Scenario2_Fail1.request_body | B1_Scenario2_Fail1.expected_response |

  @M3 @M3_Scenario2
  Scenario Outline: Edit Match
    Given there are boxers such as "<boxers>"
    And there is a match such as "<match>"
    And there is a token such as "<token>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                    | match                    | token                    | endpoint    | request_body                    | expected_response                    |
      | M3_Scenario2_Fail1.boxers | M3_Scenario2_Fail1.match | M3_Scenario2_Fail1.token | UpdateMatch | M3_Scenario2_Fail1.request_body | M3_Scenario2_Fail1.expected_response |

  @M1 @M1_Scenario1
  Scenario Outline: Add Match
    Given there are boxers such as "<boxers>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | admin                         | endpoint | request_body                         | expected_response                          |
      | M1_Scenario1_Variation1.boxers | M1_Scenario1_Variation1.admin | AddMatch | M1_Scenario1_Variation1.request_body | M1_Scenario1_Variation1.expected_response |
