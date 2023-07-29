class AddFavoritesColumnToWsUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :ws_users, :favorites, :integer, array: true, default: []
  end
end
