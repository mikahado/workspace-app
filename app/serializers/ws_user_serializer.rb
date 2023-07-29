class WsUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :favorites
  has_many :reviews 
  has_many :workspaces
end
