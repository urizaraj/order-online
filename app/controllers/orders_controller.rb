# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
    render json: Order.limit(5), include: '**'
  end

  def create
    Order.create(attributes)
  end

  def show
    order = Order.find(params[:id])
    render json: order, include: %w[order_items order_items.selected_options]
  end

  def strong_params
    params
      .require(:order)
      .permit(:location_id, items: [:id, :instructions, selectedOptions: [:id]])
  end

  def attributes
    {
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
  end
end
