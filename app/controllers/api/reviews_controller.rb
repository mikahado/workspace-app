class Api::ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def show 
        review = Review.find_by(id: params[:id])
        render json: review
    end

    def create
        workspace = Workspace.find_by(id: params[:workspace_id])
        review = workspace.reviews.create(params)
        render json: review 
    end

    def update
        review = Review.find_by(id: params[:id])
    review.update(
      comment: params[:comment]
    )
        render json: review 
    end

    def delete
        review = Review.find_by(id: params[:id])
        review.destroy
        render json: review 
    end


end
