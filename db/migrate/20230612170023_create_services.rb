class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :category
      t.boolean :wifi
      t.text :description
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
