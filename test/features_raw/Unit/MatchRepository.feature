@Unit @Repository @MatchRepository
Feature: Match Repository Unit Feature

  #SUCCESS SCENARIOS

  @Unit_Repository_Scenario1
  Scenario Outline: Get all matches
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked
    Then returned data is as "<expected_data>"

    Examples:
      | matches                           | repository_function | expected_data                           |
      | Unit_Repository_Scenario1.matches | getAllMatches       | Unit_Repository_Scenario1.expected_data |

  @Unit_Repository_Scenario2
  Scenario Outline: Get matches of boxer
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                           | repository_function | boxer_id                           | expected_data                           |
      | Unit_Repository_Scenario2.matches | getMatchesOfBoxer   | Unit_Repository_Scenario2.boxer_id | Unit_Repository_Scenario2.expected_data |

  @Unit_Repository_Scenario3
  Scenario Outline: Add a new match to DB
    Given the latest match in DB is such as "<existing_match>"
    When "<repository_function>" is invoked with "<data_chunk>"
    Then DB has match such as "<new_match>"

    Examples:
      | existing_match                           | repository_function   | data_chunk                           | new_match                           |
      | Unit_Repository_Scenario3.existing_match | addMatchWithGivenData | Unit_Repository_Scenario3.data_chunk | Unit_Repository_Scenario3.new_match |

  @Unit_Repository_Scenario4
  Scenario Outline: Get match by id
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<match_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | match                           | repository_function | match_id                           | expected_data                           |
      | Unit_Repository_Scenario4.match | getMatchById        | Unit_Repository_Scenario4.match_id | Unit_Repository_Scenario4.expected_data |

  @Unit_Repository_Scenario5
  Scenario Outline: Remove match by id
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<match_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                           | repository_function | match_id                           | expected_data                           |
      | Unit_Repository_Scenario5.matches | removeMatchById     | Unit_Repository_Scenario5.match_id | Unit_Repository_Scenario5.expected_data |

  @Unit_Repository_Scenario6
  Scenario Outline: Remove matches of boxer
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                            | repository_function  | boxer_id                            | expected_data                            |
      | Unit_Repository_Scenario6.matches | removeMatchesOfBoxer | Unit_Repository_Scenario6.boxer_id | Unit_Repository_Scenario6.expected_data |

  @Unit_Repository_Scenario7
  Scenario Outline: Update match
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<match>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches                            | repository_function | match                            | expected_data                            |
      | Unit_Repository_Scenario7.matches | updateMatch         | Unit_Repository_Scenario7.match | Unit_Repository_Scenario7.expected_data |

  #FAIL SCENARIOS
