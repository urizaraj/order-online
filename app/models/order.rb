# frozen_string_literal: true

class Order < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :location
  has_many :order_items

  accepts_nested_attributes_for :order_items
  validate :at_least_one_order_item
  validates :full_name, presence: true
  validates :delivery_type, inclusion: { in: %w[pickup delivery] }
  validates :payment_type, inclusion: { in: %w[cash card] }
  validates :zipcode, format: { with: /\d{5}/ }
  validates :state, format: { with: /[A-Z]{2}/ }
  validates :card_number,
            format: { with: /\d{16}/ },
            if: :payment_type_card

  def user_name
    user.name
  end

  def location_name
    location.name
  end

  def at_least_one_order_item
    return unless order_items.empty?
    errors.add :base, 'Must have at least one order item.'
  end

  def payment_type_card
    payment_type == 'card'
  end
end
