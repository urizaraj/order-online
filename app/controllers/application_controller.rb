class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def authenticate
    authenticate_or_request_with_http_token do |token|
      payload = JWT.decode token, nil, false
      @user = User.find(payload[0]['user'])
    end
  end
end
