class Api::WsUsersController < ApplicationController
    
    skip_before_action :authorize, only: :create

    def show
        render json: @current_user
    end

    def index
        render json: WsUser.all
    end

    def create 
        user = WsUser.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
