class LocationsController < ApplicationController
  def index
    render json: Location.all
  end

  def show
    render json: Location.find(params[:id])
  end
end
