class CreateWorkspaces < ActiveRecord::Migration[7.0]
  def change
    create_table :workspaces do |t|
      t.string :title
      t.string :address
      t.float :lat
      t.float :lng
      t.string :media

      t.timestamps
    end
  end
end
