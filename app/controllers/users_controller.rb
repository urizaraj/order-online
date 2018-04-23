class UsersController < ApplicationController
  def sign_in
    user = User.find_by(name: params[:name])
    
    valid = user && user.authenticate(params[:password])

    return render json: {message: 'invalid'} unless valid
    
    payload = {user: user.id}

    token = JWT.encode payload, nil, 'none'

    render json: {token: token, id: user.id, name: user.name}
  end
end
