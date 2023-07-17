class WsUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :favorites
  has_many :reviews 
  has_many :workspaces
end
