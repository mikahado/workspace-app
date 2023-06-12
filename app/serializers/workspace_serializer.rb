class WorkspaceSerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :lat, :lng, :media
end
