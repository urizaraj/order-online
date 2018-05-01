class User < ApplicationRecord
  has_secure_password

  has_many :orders
  validates :name,
            uniqueness: { case_sensitive: false },
            presence: true,
            format: { with: /[A-Za-z0-9\-_]+/ }
end
