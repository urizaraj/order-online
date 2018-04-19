class CreateMenus < ActiveRecord::Migration[5.2]
  def change
    create_table :menus do |t|
      t.string :name, default: 'Menu'

      t.integer :location_id

      t.timestamps
    end
  end
end
