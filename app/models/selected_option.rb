class SelectedOption < ApplicationRecord
  belongs_to :order_item
  belongs_to :option

  def name
    option.name
  end

  def price
    option.price
  end
end
