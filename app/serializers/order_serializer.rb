# frozen_string_literal: true

class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :location_name, :created_at,
             :payment_type, :full_name, :address, :city, :state, :zipcode,
             :delivery_type

  belongs_to :location
  belongs_to :user
  has_many :order_items
end
