# frozen_string_literal: true

class UsersController < ApplicationController
  def sign_in
    user = User.where('lower(name) = ?', params[:name].downcase).first

    valid = user&.authenticate(params[:password])
    return render json: { message: 'invalid' } unless valid

    render json: { token: generate_token(user), id: user.id, name: user.name }
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.new(name: params[:name], email: params[:email], password: params[:password])
    valid = user.save
    return render json: { message: 'invalid' } unless valid

    render json: { token: generate_token(user), id: user.id, name: user.name }
  end

  private

  def strong_params
    params
      .require(:user)
      .permit :name,
              :email,
              :password
  end

  def generate_token(user)
    payload = { user: user.id }
    JWT.encode payload, nil, 'none'
  end
end
