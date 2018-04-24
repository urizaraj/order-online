class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :instructions

  has_many :selected_options
end
