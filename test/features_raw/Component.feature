@Component
Feature: Match Service Component Features

  #SUCCESS SCENARIOS


  @B1 @B1_Scenario1
  Scenario Outline: Get Matches Of Boxer
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | endpoint          | request_body                         | expected_response                         |
      | B1_Scenario1_Variation1.boxers | B1_Scenario1_Variation1.matches | GetMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response |

  @B4 @B4_Scenario1
  Scenario Outline: Remove Matches of a Boxer
    Given there are matches such as "<matches>"
    And there are boxers such as "<boxers>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                         | boxers                         | admin                         | endpoint             | request_body                         | expected_response                         |
      | B4_Scenario1_Variation1.matches | B4_Scenario1_Variation1.boxers | B4_Scenario1_Variation1.admin | RemoveMatchesOfBoxer | B4_Scenario1_Variation1.request_body | B4_Scenario1_Variation1.expected_response |

  @H1 @H1_Scenario1
  Scenario Outline: Get All Matches
    Given there are matches such as "<matches>"
    When "<endpoint>" is called
    Then response is as "<expected_response>"

    Examples:
      | matches                         | endpoint      | expected_response                         |
      | H1_Scenario1_Variation1.matches | GetAllMatches | H1_Scenario1_Variation1.expected_response |

  @M1 @M1_Scenario1
  Scenario Outline: Add Match
    Given there are boxers such as "<boxers>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | admin                         | endpoint | request_body                         | expected_response                         |
      | M1_Scenario1_Variation1.boxers | M1_Scenario1_Variation1.admin | AddMatch | M1_Scenario1_Variation1.request_body | M1_Scenario1_Variation1.expected_response |

  @M2 @M2_Scenario1
  Scenario Outline: Remove Match
    Given there are matches such as "<matches>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                         | admin                         | endpoint    | request_body                         | expected_response                         |
      | M2_Scenario1_Variation1.matches | M2_Scenario1_Variation1.admin | RemoveMatch | M2_Scenario1_Variation1.request_body | M2_Scenario1_Variation1.expected_response |

  @M3 @M3_Scenario1
  Scenario Outline: Update Match
    Given there are matches such as "<matches>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                         | admin                         | endpoint    | request_body                         | expected_response                         |
      | M3_Scenario1_Variation1.matches | M3_Scenario1_Variation1.admin | UpdateMatch | M3_Scenario1_Variation1.request_body | M3_Scenario1_Variation1.expected_response |

  #FAIL SCENARIOS

  @B1 @B1_Scenario2 @Fail
  Scenario Outline: Get Matches Of Boxer - Fail
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                    | matches                    | endpoint          | request_body                    | expected_response                    |
      | B1_Scenario2_Fail.boxers | B1_Scenario2_Fail.matches | GetMatchesOfBoxer | B1_Scenario2_Fail.request_body | B1_Scenario2_Fail.expected_response |

  @B4 @B4_Scenario2 @Fail
  Scenario Outline: Remove Matches of a Boxer - Fail
    Given there are matches such as "<matches>"
    And there are boxers such as "<boxers>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                   | boxers                   | admin                   | endpoint             | request_body                   | expected_response                   |
      | B4_Scenario2_Fail.matches | B4_Scenario2_Fail.boxers | B4_Scenario2_Fail.admin | RemoveMatchesOfBoxer | B4_Scenario2_Fail.request_body | B4_Scenario2_Fail.expected_response |
