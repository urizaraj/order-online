class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price

  has_many :selected_options
end
