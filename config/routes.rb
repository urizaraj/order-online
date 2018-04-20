Rails.application.routes.draw do
  resources :options
  resources :locations
  resources :items
  resources :categories
  resources :menus
end
