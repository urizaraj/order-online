class OrderSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :location
  belongs_to :user
  has_many :order_items
end
