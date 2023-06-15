class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :category, :wifi, :description, :workspace_id
  has_one :workspace
end
