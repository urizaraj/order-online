class OrdersController < ApplicationController
  def create
    order = Order.create
    strong_params[:items].each do |item|
      order_item = order.order_items.create(
        item_id: item[:id],
        instructions: item[:instructions]
      )
      item[:selectedOptions].each do |so|
        order_item.selected_options.create(
          option_id: so[:id]
        )
      end
    end
  end

  def strong_params
    params
      .require(:order)
      .permit(items: [:id, :instructions, selectedOptions: [:id]])
  end
end
