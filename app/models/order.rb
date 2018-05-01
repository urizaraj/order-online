class Order < ApplicationRecord
  belongs_to :user
  belongs_to :location
  has_many :order_items
  
  accepts_nested_attributes_for :order_items
  validate :at_least_one_order_item

  def user_name
    user.name
  end

  def location_name
    location.name
  end

  def at_least_one_order_item
    return if order_items.length > 0
    errors.add :base, 'Must have at least one order item.'
  end
end
