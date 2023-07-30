class WsUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :favorites
  has_many :reviews 
  has_many :workspaces
end
