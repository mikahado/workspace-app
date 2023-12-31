Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
namespace :api do
  
  resources :ws_users
  resources :workspaces
  resources :reviews
  resources :services

  get '/me', to: 'ws_users#show'
  post '/signup', to: 'ws_users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
end

# get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '*path', to: "fallback#index", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end

end
