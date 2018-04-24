class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :item
  has_many :selected_options

  accepts_nested_attributes_for :selected_options
end
