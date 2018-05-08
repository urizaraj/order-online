class Menu < ApplicationRecord
  belongs_to :location
  has_many :categories

  accepts_nested_attributes_for :categories, allow_destroy: true
end
