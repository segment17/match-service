@Unit @Repository @MatchRepository
Feature: Match Repository Unit Feature

  #SUCCESS SCENARIOS

  @Unit_Repository_Scenario1
  Scenario Outline: Get all matches from Match Repository
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                           | repository_function | boxer_id                           | expected_data                           |
      | Unit_Repository_Scenario1.matches | getBoxerWithId      | Unit_Repository_Scenario1.boxer_id | Unit_Repository_Scenario1.expected_data |

  @Unit_Repository_Scenario2
  Scenario Outline: Get matches of boxer from Match Repository
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                           | repository_function | boxer_id                           | expected_data                           |
      | Unit_Repository_Scenario2.matches | getBoxerWithId      | Unit_Repository_Scenario2.boxer_id | Unit_Repository_Scenario2.expected_data |

  @Unit_Repository_Scenario3
  Scenario Outline: Edit details of a match in Match Repository
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<edit_body>"
    Then returned data is as "<expected_data>"
    And DB has match such as "<edited_match>"

    Examples:
      | match                           | repository_function    | edit_body                           | expected_data                           | edited_boxer                                  |
      | Unit_Repository_Scenario3.match | editBoxerWithGivenData | Unit_Repository_Scenario3.edit_body | Unit_Repository_Scenario3.expected_data | Unit_Repository_Scenario2.expected_data.boxer |

  @Unit_Repository_Scenario8
  Scenario Outline: Get match by id
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<match_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | match                           | repository_function | match_id                           | expected_data                           |
      | Unit_Repository_Scenario8.match | getMatchById        | Unit_Repository_Scenario8.match_id | Unit_Repository_Scenario8.expected_data |

  #FAIL SCENARIOS

  @Unit_Repository_Scenario4
  Scenario Outline: Get matches of boxer from Match Repository failure
    Given there are matches such as "<match>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                                 | repository_function | boxer_id                                 | expected_data                                 |
      | Unit_Repository_Scenario4_Fail1.matches | getBoxerWithId      | Unit_Repository_Scenario4_Fail1.boxer_id | Unit_Repository_Scenario4_Fail1.expected_data |

  @Unit_Repository_Scenario5
  Scenario Outline: Get matches of boxer from Match Repository failure
    Given there are matches such as "<match>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                                 | repository_function | boxer_id                                 | expected_data                                 |
      | Unit_Repository_Scenario5_Fail1.matches | getBoxerWithId      | Unit_Repository_Scenario5_Fail1.boxer_id | Unit_Repository_Scenario5_Fail1.expected_data |

  @Unit_Repository_Scenario6
  Scenario Outline: Edit details of a match in Match Repository failure
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<edit_body>"
    Then returned data is as "<expected_data>"
    And DB has match such as "<edited_match>"

    Examples:
      | match                                 | repository_function    | edit_body                                 | expected_data                                 | edited_boxer                                        |
      | Unit_Repository_Scenario6_Fail1.match | editBoxerWithGivenData | Unit_Repository_Scenario6_Fail1.edit_body | Unit_Repository_Scenario6_Fail1.expected_data | Unit_Repository_Scenario6_Fail1.expected_data.boxer |
      | Unit_Repository_Scenario6_Fail2.match | editBoxerWithGivenData | Unit_Repository_Scenario6_Fail2.edit_body | Unit_Repository_Scenario6_Fail2.expected_data | Unit_Repository_Scenario6_Fail1.expected_data.boxer |
