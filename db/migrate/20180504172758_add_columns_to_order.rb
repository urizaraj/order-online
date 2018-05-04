class AddColumnsToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :payment_type, :string
    add_column :orders, :full_name, :string
    add_column :orders, :address, :string
    add_column :orders, :city, :string
    add_column :orders, :state, :string
    add_column :orders, :zipcode, :string
    add_column :orders, :delivery_type, :string
    add_column :orders, :tip, :float
    add_column :orders, :card_number, :string
  end
end
