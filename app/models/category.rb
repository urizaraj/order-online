class Category < ApplicationRecord
  belongs_to :menu
  has_many :items

  accepts_nested_attributes_for :items, allow_destroy: true

  validates :name, presence: true
end
