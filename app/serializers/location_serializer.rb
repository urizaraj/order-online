class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_one :menu

  class MenuSerializer < ActiveModel::Serializer
    attributes :id, :name
  end
end
