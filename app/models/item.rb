class Item < ApplicationRecord
  belongs_to :category
  has_many :options

  accepts_nested_attributes_for :options
end
