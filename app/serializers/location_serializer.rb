class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :menus

  class MenuSerializer < ActiveModel::Serializer
    attributes :id, :name
  end
end
