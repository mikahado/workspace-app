class WsUser < ApplicationRecord
    has_secure_password

    has_many :reviews
    has_many :workspaces

    def update_favorites(updated_favorites)
        self.favorites |= updated_favorites
        save
      end

end
