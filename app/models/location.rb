class Location < ApplicationRecord
  has_many :menus
  has_many :categories, through: :menus
  has_many :items, through: :categories
  has_many :options, through: :items

  accepts_nested_attributes_for :menus
end
