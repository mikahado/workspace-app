class WorkspaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :lat, :lng
  has_many :reviews
  has_many :services
end
