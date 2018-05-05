# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :authenticate, only: [:create]

  def index
    render json: Order.limit(5), include: '**'
  end

  def create
    order = Order.new(stronger_params)
    order.user = @user
    render json: { status: order.save }
  end

  def show
    order = Order.find(params[:id])
    render json: order, include: %w[order_items order_items.selected_options]
  end

  def stronger_params
    params
      .require(:order)
      .permit(
        :location_id,
        order_items_attributes: [
          :item_id,
          :instructions,
          selected_options_attributes: [:option_id]
        ]
      )
  end
end
