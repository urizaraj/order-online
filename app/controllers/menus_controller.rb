class MenusController < ApplicationController
  def show
    menu = Menu.find(params[:id])
    render json: menu, include: '**'
  end
end
