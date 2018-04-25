class UsersController < ApplicationController
  def sign_in
    # user = User.find_by(name: params[:name])
    user = User.where('lower(name) = ?', params[:name].downcase).first 

    valid = user && user.authenticate(params[:password])
    return render json: {message: 'invalid'} unless valid

    payload = {user: user.id}
    token = JWT.encode payload, nil, 'none'
    render json: {token: token, id: user.id, name: user.name}
  end

  def sign_in_token
    payload = JWT.decode params[:token], nil, false
    user = User.find(payload[0]['user'])

    return render json: {message: 'invalid'} unless user

    render json: user
  end

  def show
    user = User.find(params[:id])
    render json: user
  end
end
