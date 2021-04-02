@E2E
Feature: Match Service E2E Features

    Background: Prepare Services
        Given "BoxerService" is running

    @H1 @H1_Scenario1
    Scenario Outline: Get All Matches
        Given there are boxers such as "<boxers>"
        When "<endpoint>" is called
        Then response is as "<expected_response>"

        Examples:
            | boxers                         | endpoint      | expected_response                         |
            | H2_Scenario1_Variation1.boxers | GetAllMatches | H2_Scenario1_Variation1.expected_response |

    @M3 @M3_Scenario1
    Scenario Outline: Edit Match
        Given there are boxers such as "<boxers>"
        When "<endpoint>" is called with request body "<request_body>"
        Then response is as "<expected_response>"

        Examples:
            | boxers                         | endpoint    | request_body                         | expected_response                          |
            | M3_Scenario1_Variation1.boxers | UpdateMatch | M3_Scenario1_Variation1.request_body | M3__Scenario1_Variation1.expected_response |