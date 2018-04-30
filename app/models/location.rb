class Location < ApplicationRecord
  has_one :menu
  has_many :categories, through: :menu
  has_many :items, through: :categories
  has_many :options, through: :items

  accepts_nested_attributes_for :menu
end
