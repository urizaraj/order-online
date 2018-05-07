# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :authenticate, only: %i[create index]

  def index
    page = params[:page].to_i || 1
    offset = (page - 1) * 5
    render json: @user.orders.limit(5).offset(offset), each_serializer: OrderIndexSerializer
  end

  def create
    order = Order.new(stronger_params)
    order.user = @user
    order.save
    return render json: { status: false, messages: order.errors.full_messages } unless order.valid?
    render json: { status: true }
  end

  def show
    order = Order.find(params[:id])
    render json: order, include: %w[order_items order_items.selected_options]
  end

  def stronger_params
    params
      .require(:order)
      .permit(
        :location_id, :payment_type, :card_number, :full_name,
        :address, :city, :state, :zipcode,
        :delivery_type, :tip,
        order_items_attributes: [
          :item_id,
          :instructions,
          selected_options_attributes: [:option_id]
        ]
      )
  end
end
