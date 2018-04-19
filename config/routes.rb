Rails.application.routes.draw do
  resources :locations
  resources :items
  resources :categories
  resources :menus
end
