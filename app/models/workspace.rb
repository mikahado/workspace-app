class Workspace < ApplicationRecord
    has_many :services
    has_many :reviews

    # validates :title, uniqueness: true
    validates :lat, presence: true
end
