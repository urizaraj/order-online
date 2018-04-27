class LocationEditSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :menus
  has_many :categories
  has_many :items
  has_many :options

  class MenuSerializer < ActiveModel::Serializer
    attributes :id, :name, :location_id
  end

  class CategorySerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :menu_id
  end

  class ItemSerializer < ActiveModel::Serializer
    attributes :id, :name, :description, :price, :category_id
  end

  class OptionSerializer < ActiveModel::Serializer
    attributes :id, :name, :price, :item_id
  end
end
