class CreateOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :options do |t|
      t.string :name
      t.integer :item_id
      t.float :price, default: 0

      t.timestamps
    end
  end
end
