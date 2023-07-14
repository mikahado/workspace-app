class AddWsUserToReviews < ActiveRecord::Migration[7.0]
  def change
    add_reference :reviews, :ws_user, foreign_key: true
  end
end
