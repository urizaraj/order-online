class AddDefaultDescription < ActiveRecord::Migration[5.2]
  def change
    change_column_default :categories, :description, from: nil, to: ''
    change_column_default :items, :description, from: nil, to: ''
  end
end
