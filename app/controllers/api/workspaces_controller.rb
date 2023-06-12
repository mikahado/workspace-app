class Api::WorkspacesController < ApplicationController
    
    def index  
        workspaces = Workspace.all
        render json: workspaces
    end

    def show
        workspace = Workspace.find_by(id: params[:id])
        render json: workspace
    end

    def create  
        new_workspace = Workspace.create(
            title: params[:title], 
            address: params[:address]
        )
        render json: new_workspace
    end




end
