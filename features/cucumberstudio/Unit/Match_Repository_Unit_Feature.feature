@Unit @Repository @MatchRepository
Feature: Match Repository Unit Feature


  @Unit_Repository_Scenario1
  Scenario Outline: Get all matches from Match Repository (<hiptest-uid>)
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches | repository_function | boxer_id | expected_data | hiptest-uid |
      | Unit_Repository_Scenario1.matches | getBoxerWithId | Unit_Repository_Scenario1.boxer_id | Unit_Repository_Scenario1.expected_data | uid:1d4323a4-f9e1-4093-afba-b5b035bf01c8 |

  @Unit_Repository_Scenario2
  Scenario Outline: Get matches of boxer from Match Repository (<hiptest-uid>)
    Given there are matches such as "<matches>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches | repository_function | boxer_id | expected_data | hiptest-uid |
      | Unit_Repository_Scenario2.matches | getBoxerWithId | Unit_Repository_Scenario2.boxer_id | Unit_Repository_Scenario2.expected_data | uid:8629583c-a8e8-4a02-9df7-8e0b2abb8ce1 |

  @Unit_Repository_Scenario3
  Scenario Outline: Edit details of a match in Match Repository (<hiptest-uid>)
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<edit_body>"
    Then returned data is as "<expected_data>"
    And DB has match such as "<edited_match>"

    Examples:
      | match | repository_function | edit_body | expected_data | edited_boxer | hiptest-uid |
      | Unit_Repository_Scenario3.match | editBoxerWithGivenData | Unit_Repository_Scenario3.edit_body | Unit_Repository_Scenario3.expected_data | Unit_Repository_Scenario2.expected_data.boxer | uid:97ca3972-b6a4-490d-9d31-96bbf569cdee |

  @Unit_Repository_Scenario4
  Scenario Outline: Get matches of boxer from Match Repository failure (<hiptest-uid>)
    Given there are matches such as "<match>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches | repository_function | boxer_id | expected_data | hiptest-uid |
      | Unit_Repository_Scenario4_Fail1.matches | getBoxerWithId | Unit_Repository_Scenario4_Fail1.boxer_id | Unit_Repository_Scenario4_Fail1.expected_data | uid:c3237714-4a7b-494a-bb4c-2e7d7520faf8 |

  @Unit_Repository_Scenario5
  Scenario Outline: Get matches of boxer from Match Repository failure (1) (<hiptest-uid>)
    Given there are matches such as "<match>"
    When "<repository_function>" is invoked with "<boxer_id>"
    Then returned data is as "<expected_data>"

    Examples:
      | matches | repository_function | boxer_id | expected_data | hiptest-uid |
      | Unit_Repository_Scenario5_Fail1.matches | getBoxerWithId | Unit_Repository_Scenario5_Fail1.boxer_id | Unit_Repository_Scenario5_Fail1.expected_data | uid:e522ef0f-e28e-4cf6-833e-13ac6ca3bf2b |

  @Unit_Repository_Scenario6
  Scenario Outline: Edit details of a match in Match Repository failure (<hiptest-uid>)
    Given there is a match such as "<match>"
    When "<repository_function>" is invoked with "<edit_body>"
    Then returned data is as "<expected_data>"
    And DB has match such as "<edited_match>"

    Examples:
      | match | repository_function | edit_body | expected_data | edited_boxer | hiptest-uid |
      | Unit_Repository_Scenario6_Fail1.match | editBoxerWithGivenData | Unit_Repository_Scenario6_Fail1.edit_body | Unit_Repository_Scenario6_Fail1.expected_data | Unit_Repository_Scenario6_Fail1.expected_data.boxer | uid:ce4050fd-fea4-44ae-8697-2a0d944d122b |
      | Unit_Repository_Scenario6_Fail2.match | editBoxerWithGivenData | Unit_Repository_Scenario6_Fail2.edit_body | Unit_Repository_Scenario6_Fail2.expected_data | Unit_Repository_Scenario6_Fail1.expected_data.boxer | uid:24bce8ac-2e80-4040-8079-c226b28860bf |
