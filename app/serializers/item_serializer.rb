class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price
  has_many :options
end
