class AddFavoritesToWsUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :ws_users, :favorites, :integer
  end
end
