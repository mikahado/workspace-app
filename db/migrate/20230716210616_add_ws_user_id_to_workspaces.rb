class AddWsUserIdToWorkspaces < ActiveRecord::Migration[7.0]
  def change
    add_reference :workspaces, :ws_user, foreign_key: true
    remove_column :workspaces, :media, :string

  end
end
