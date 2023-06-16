class RemoveColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :reviews, :ws_user_id
  end
end
