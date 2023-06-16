class Workspace < ApplicationRecord
    has_many :services, dependent: :destroy
    has_many :reviews, dependent: :destroy

    # validates :title, uniqueness: true
    validates :lat, presence: true
end
