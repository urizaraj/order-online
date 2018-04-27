class LocationsController < ApplicationController
  def index
    render json: Location.all
  end

  def show 
    location = Location.find(params[:id])

    return render json: location, serializer: LocationEditSerializer if params[:edit]
    render json: location
  end

  def create
    location = Location.new(strong_params)
    status = location.save
    render json: {saved: status}
  end

  private

  def strong_params
    params
      .require(:location)
      .permit(
        :name,
        :description,
        menus_attributes: [
          categories_attributes: [
            :name,
            items_attributes: [
              :name,
              :price,
              options_attributes: [
                :name,
                :price
              ]
            ]
          ]
        ]
      )
  end
end
