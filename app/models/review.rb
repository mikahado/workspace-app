class Review < ApplicationRecord
  belongs_to :workspace
  belongs_to :ws_user

  validates :comment, presence: true, length: { maximum: 280 }
  validates :rating, presence: true

end
