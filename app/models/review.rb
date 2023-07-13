class Review < ApplicationRecord
  belongs_to :workspace
  belongs_to :ws_user
end
