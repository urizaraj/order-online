class Item < ApplicationRecord
  belongs_to :category
  has_many :options

  accepts_nested_attributes_for :options

  validates :name, presence: true
  validates :price, presence: true
end
