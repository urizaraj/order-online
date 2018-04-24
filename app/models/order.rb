class Order < ApplicationRecord
  belongs_to :user
  belongs_to :location
  has_many :order_items
  
  accepts_nested_attributes_for :order_items

  def user_name
    user.name
  end

  def location_name
    location.name
  end
end
