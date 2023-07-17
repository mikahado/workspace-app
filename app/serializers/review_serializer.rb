class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :ws_user_id, :workspace_id, :created_at, :workspace_title

  has_one :workspace
  has_one :ws_user

  def workspace_title
    object.workspace.title
  end
end
