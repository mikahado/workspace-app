Rails.application.routes.draw do
  resources :reviews
  resources :services
  resources :workspaces
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
namespace :api do
  # Defines the root path route ("/")
  # root "articles#index"
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end

end
