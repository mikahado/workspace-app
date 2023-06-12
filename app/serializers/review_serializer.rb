class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment
  has_one :workspace
  has_one :ws_user
end
