class Api::WsUsersController < ApplicationController
    
    skip_before_action :authorize, only: [:create, :index]

    def index
        allUsers = WsUser.all
        render json: allUsers
    end
   
    def show
        render json: @current_user
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
