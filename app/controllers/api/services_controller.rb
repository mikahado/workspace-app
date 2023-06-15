class Api::ServicesController < ApplicationController

    def create
        begin
          service = Service.create!(service_params) # Remove the plural form of "services"
          render json: service # Use singular form "service" instead of "services"
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
        end
      end

    private 

    def service_params
        params.require(:service).permit(:workspace_id, :category, :description)
    end

end
