Rails.application.routes.draw do
  resources :users
  resources :locations
  resources :menus
  resources :categories
  resources :items
  resources :options
  
  resources :orders
  resources :order_items
  resources :selected_options

  post '/users/sign_in', to: 'users#sign_in'
end
