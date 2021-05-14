@Integration @Service @AuthServiceGateway
Feature: Auth Service Gateway Integration Feature

    @Integration_AuthService_Scenario1
    Scenario Outline: Validate admin token
        When "<endpoint>" is called with "<request_body>"
        Then response is as "<expected_response>"

        Examples:
            | endpoint | request_body                                           | expected_response                                           |
            | Validate | Integration_AuthService_Scenario1_success.request_body | Integration_AuthService_Scenario1_success.expected_response |
            | Validate | Integration_AuthService_Scenario1_fail.request_body    | Integration_AuthService_Scenario1_fail.expected_response    |
