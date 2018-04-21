Rails.application.routes.draw do
  resources :locations
  resources :menus
  resources :categories
  resources :items
  resources :options
  
  resources :orders
  resources :order_items
  resources :selected_options
end
