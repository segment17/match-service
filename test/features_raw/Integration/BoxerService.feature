@Integration @Service @BoxerServiceGateway
Feature: Boxer Service Gateway Integration Feature

    @Integration_BoxerService_Scenario1
    Scenario Outline: Get boxer
        Given there are boxers such as "<boxers>"
        When "<endpoint>" is called with "<request_body>"
        Then response is as "<expected_response>"

        Examples:
            | boxers                                            | endpoint | request_body                                            | expected_response                                            |
            | Integration_BoxerService_Scenario1_success.boxers | GetBoxer | Integration_BoxerService_Scenario1_success.request_body | Integration_BoxerService_Scenario1_success.expected_response |
            | Integration_BoxerService_Scenario1_fail1.boxers   | GetBoxer | Integration_BoxerService_Scenario1_fail1.request_body   | Integration_BoxerService_Scenario1_fail1.expected_response   |
            | Integration_BoxerService_Scenario1_fail2.boxers   | GetBoxer | Integration_BoxerService_Scenario1_fail2.request_body   | Integration_BoxerService_Scenario1_fail2.expected_response   |
