Rails.application.routes.draw do
  resources :selected_options
  resources :order_items
  resources :orders
  resources :options
  resources :locations
  resources :items
  resources :categories
  resources :menus
end
