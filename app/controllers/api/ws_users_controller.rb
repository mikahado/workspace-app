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

    def update
        if params[:favorites].present?
          updated_user = @current_user.update_favorites(user_params[:favorites])
        end
    
        if @current_user.update(user_params.except(:favorites))
          render json: @current_user
        else
          render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, favorites: [])
      end

end
