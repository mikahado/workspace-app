class RemoveFavoritesFromWsUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :ws_users, :favorites
  end
end
