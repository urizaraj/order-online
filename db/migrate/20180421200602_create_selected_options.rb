class CreateSelectedOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :selected_options do |t|
      t.integer :order_item_id
      t.integer :option_id
      t.timestamps
    end
  end
end
