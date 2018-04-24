class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :location_name, :created_at

  belongs_to :location
  belongs_to :user
  has_many :order_items
end
