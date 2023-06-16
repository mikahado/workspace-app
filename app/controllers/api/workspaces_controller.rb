class Api::WorkspacesController < ApplicationController

    skip_before_action :authorize, only: [:index, :show, :create]
    
    def index  
        workspaces = Workspace.all
        render json: workspaces
    end

    def show
        workspace = Workspace.find_by(id: params[:id])
        render json: workspace
    end

    def create  
        new_workspace = Workspace.create!(workspace_params)
        render json: new_workspace
    end

    def destroy
        workspace = Workspace.find_by(id: params[:id])
        workspace.destroy
        render json: { message: "Workspace deleted" }, status: :ok
    end

    private

    def workspace_params
        params.permit(:title, :lat, :lng)
    end

end
