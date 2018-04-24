class OrdersController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
    render json: Order.all, include: '**'
  end

  def create
    attributes = {
      location_id: strong_params[:location_id],
      user_id: @user.id,
      order_items_attributes: strong_params[:items].map do |item|
        {
          item_id: item[:id],
          instructions: item[:instructions],
          selected_options_attributes: item[:selectedOptions].map do |so|
            {
              option_id: so[:id]
            }
          end
        }
      end
    }

    Order.create(attributes)
  end

  def strong_params
    params
      .require(:order)
      .permit(:location_id, items: [:id, :instructions, selectedOptions: [:id]])
  end
end
