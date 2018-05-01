# frozen_string_literal: true

class UsersController < ApplicationController
  def sign_in
    # user = User.find_by(name: params[:name])
    user = User.where('lower(name) = ?', params[:name].downcase).first

    valid = user&.authenticate(params[:password])
    return render json: { message: 'invalid' } unless valid

    payload = { user: user.id }
    token = JWT.encode payload, nil, 'none'
    render json: { token: token, id: user.id, name: user.name }
  end

  def sign_in_token
    payload = JWT.decode params[:token], nil, false
    user = User.find(payload[0]['user'])

    return render json: { message: 'invalid' } unless user

    render json: user
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.new(name: params[:name], email: params[:email], password: params[:password])
    valid = user.save
    return render json: { message: 'invalid' } unless valid
    render json: user
  end

  private

  def strong_params
    params
      .require(:user)
      .permit :name,
              :email,
              :password
  end
end
