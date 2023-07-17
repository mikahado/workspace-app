class ReviewSerializer < ActiveModel::Serializer
  attributes :rating, :comment, :ws_user_id, :workspace_id, :created_at

  has_one :workspace
  has_one :ws_user
end
