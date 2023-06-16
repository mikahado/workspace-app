Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
namespace :api do
  
  resources :ws_users
  resources :workspaces
  resources :reviews
  resources :services

  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
end

# get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

get '*path', to: "application#fallback_index_html", constraints: ->(request) do
  !request.xhr? && request.format.html?
end

end
