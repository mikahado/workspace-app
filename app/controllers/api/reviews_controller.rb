class Api::ReviewsController < ApplicationController

    skip_before_action :authorize

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
        review = workspace.reviews.create!(review_params)
        render json: review 
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update!(
            review_params
        )
        render json: review 
    end

    def destroy
        review = Review.find_by(id: params[:id])
        review.delete
        render json: review 
    end

    private

    def review_params
    params.require(:review).permit(:rating, :comment, :workspace_id, :ws_user_id)
    end


end
