class Workspace < ApplicationRecord
    has_many :services
    has_many :reviews
end
