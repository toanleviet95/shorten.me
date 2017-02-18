class ApplicationController < ActionController::API
     include ActionController::HttpAuthentication::Token::ControllerMethods
     # Define PAYLOAD for securing REST APIs
    PAYLOAD = {:data => 'leviettoan'}
    
    # Require JWT authentication when access APIs
    before_action :authenticate

     # Use JWT to encode payload then compare with input token
    def authenticate
        input = JWT.encode PAYLOAD, nil, 'none'
        authenticate_or_request_with_http_token do |token, options|
            ActiveSupport::SecurityUtils.secure_compare(
            ::Digest::SHA256.hexdigest(token),
            ::Digest::SHA256.hexdigest(input)
            )
        end
    end
end
