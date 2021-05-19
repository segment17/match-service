@E2E
Feature: Match Service E2E Features

  @B1 @B1_Scenario1
  Scenario Outline: Get Matches Of Boxer
    Given there are boxers such as "<boxers>"
    And there are matches such as "<matches>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | boxers                         | matches                         | endpoint          | request_body                         | expected_response                         |
      | B1_Scenario1_Variation1.boxers | B1_Scenario1_Variation1.matches | GetMatchesOfBoxer | B1_Scenario1_Variation1.request_body | B1_Scenario1_Variation1.expected_response |
      | B1_Scenario1_Fail2.boxers      | B1_Scenario1_Fail2.matches      | GetMatchesOfBoxer | B1_Scenario1_Fail2.request_body      | B1_Scenario1_Fail2.expected_response      |

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
      | B4_Scenario1_Fail1.matches      | B4_Scenario1_Fail1.boxers      | B4_Scenario1_Fail1.admin      | RemoveMatchesOfBoxer | B4_Scenario1_Fail1.request_body      | B4_Scenario1_Fail1.expected_response      |
      | B4_Scenario1_Fail2.matches      | B4_Scenario1_Fail2.boxers      | B4_Scenario1_Fail2.admin      | RemoveMatchesOfBoxer | B4_Scenario1_Fail2.request_body      | B4_Scenario1_Fail2.expected_response      |
      | B4_Scenario1_Fail3.matches      | B4_Scenario1_Fail3.boxers      | B4_Scenario1_Fail3.admin      | RemoveMatchesOfBoxer | B4_Scenario1_Fail3.request_body      | B4_Scenario1_Fail3.expected_response      |

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
      | M1_Scenario1_Fail1.boxers      | M1_Scenario1_Fail1.admin      | AddMatch | M1_Scenario1_Fail1.request_body      | M1_Scenario1_Fail1.expected_response      |
      | M1_Scenario1_Fail2.boxers      | M1_Scenario1_Fail2.admin      | AddMatch | M1_Scenario1_Fail2.request_body      | M1_Scenario1_Fail2.expected_response      |
      | M1_Scenario1_Fail3.boxers      | M1_Scenario1_Fail3.admin      | AddMatch | M1_Scenario1_Fail3.request_body      | M1_Scenario1_Fail3.expected_response      |
      | M1_Scenario1_Fail4.boxers      | M1_Scenario1_Fail4.admin      | AddMatch | M1_Scenario1_Fail4.request_body      | M1_Scenario1_Fail4.expected_response      |

  @M2 @M2_Scenario1
  Scenario Outline: Remove Match
    Given there are matches such as "<matches>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                         | admin                         | endpoint    | request_body                         | expected_response                         |
      | M2_Scenario1_Variation1.matches | M2_Scenario1_Variation1.admin | RemoveMatch | M2_Scenario1_Variation1.request_body | M2_Scenario1_Variation1.expected_response |
      | M2_Scenario1_Fail1.matches      | M2_Scenario1_Fail1.admin      | RemoveMatch | M2_Scenario1_Fail1.request_body      | M2_Scenario1_Fail1.expected_response      |
      | M2_Scenario1_Fail2.matches      | M2_Scenario1_Fail2.admin      | RemoveMatch | M2_Scenario1_Fail2.request_body      | M2_Scenario1_Fail2.expected_response      |

  @M3 @M3_Scenario1
  Scenario Outline: Update Match
    Given there are matches such as "<matches>"
    And there are boxers such as "<boxers>"
    And there is an admin such as "<admin>"
    When "<endpoint>" is called with "<request_body>"
    Then response is as "<expected_response>"

    Examples:
      | matches                         | boxers                         | admin                         | endpoint    | request_body                         | expected_response                         |
      | M3_Scenario1_Variation1.matches | M3_Scenario1_Variation1.boxers | M3_Scenario1_Variation1.admin | UpdateMatch | M3_Scenario1_Variation1.request_body | M3_Scenario1_Variation1.expected_response |
      | M3_Scenario1_Fail1.matches      | M3_Scenario1_Fail1.boxers      | M3_Scenario1_Fail1.admin      | UpdateMatch | M3_Scenario1_Fail1.request_body      | M3_Scenario1_Fail1.expected_response      |
      | M3_Scenario1_Fail2.matches      | M3_Scenario1_Fail2.boxers      | M3_Scenario1_Fail2.admin      | UpdateMatch | M3_Scenario1_Fail2.request_body      | M3_Scenario1_Fail2.expected_response      |
      | M3_Scenario1_Fail3.matches      | M3_Scenario1_Fail3.boxers      | M3_Scenario1_Fail3.admin      | UpdateMatch | M3_Scenario1_Fail3.request_body      | M3_Scenario1_Fail3.expected_response      |
      | M3_Scenario1_Fail4.matches      | M3_Scenario1_Fail4.boxers      | M3_Scenario1_Fail4.admin      | UpdateMatch | M3_Scenario1_Fail4.request_body      | M3_Scenario1_Fail4.expected_response      |
