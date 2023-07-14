class AddReviewsToWsUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :ws_users, :reviews, :string
  end
end
