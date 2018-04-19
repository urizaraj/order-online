class CategoriesController < ApplicationController
  def show
    category = Category.find(params[:id])
    render json: category
  end
end
