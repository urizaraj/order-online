# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def authenticate
    authenticate_with_http_token do |token|
      if token != "null"
        payload = JWT.decode token, nil, false
        @user = User.find(payload[0]['user'])
      end
    end
  end

  def request_token
    request_http_token_authentication unless @user
  end

  def authenticate_or_request
    authenticate
    request_token
  end
end
