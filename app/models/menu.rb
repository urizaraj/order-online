class Menu < ApplicationRecord
  belongs_to :location
  has_many :categories
end
