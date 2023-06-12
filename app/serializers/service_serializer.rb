class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :category, :wifi, :description
  has_one :workspace
end
