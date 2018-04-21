class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :item
  has_many :selected_options
end
