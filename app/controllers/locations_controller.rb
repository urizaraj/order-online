# frozen_string_literal: true

class LocationsController < ApplicationController
  before_action :authenticate, only: %i[create update]

  def index
    page = params[:page].to_i || 1
    offset = (page - 1) * 4

    render json: Location.limit(4).offset(offset)
  end

  def show
    location = Location.find(params[:id])

    return render json: location, serializer: LocationEditSerializer if params[:edit]
    render json: location
  end

  def create
    location = Location.new(params_to_attributes)
    status = location.save
    render json: { saved: status }
  end

  def update
    location = Location.find(params[:id])
    location.update(params_to_attributes)
    render json: location, serializer: LocationEditSerializer
  end

  private

  def strong_params
    params
      .require(:location)
      .permit :name,
              :description,
              :id,
              :menuId,
              categories: %i[id cuid name description menu_id],
              items: %i[id cuid name description price category_id categoryCuid],
              options: %i[id cuid name price item_id itemCuid]
  end

  def params_to_attributes
    location = strong_params
    {
      id: location[:id],
      name: location[:name],
      description: location[:description],
      menu_attributes: {
        id: location[:menuId],
        categories_attributes: categories_attributes
      }
    }
  end

  def categories_attributes
    options = strong_params[:options].to_a.group_by do |option|
      option['item_id'] || option['itemCuid']
    end

    items = strong_params[:items].map do |item|
      key = item['id'] || item['cuid']
      options_attributes = options[key].to_a.map { |option| option.except(:itemCuid, :cuid).reject {|k, v| v.nil?} }
      item.merge(options_attributes: options_attributes)
    end

    items = items.group_by do |item|
      item['category_id'] || item['categoryCuid']
    end

    categories = strong_params[:categories].map do |category|
      key = category['id'] || category['cuid']
      items_attributes = items[key].to_a.map { |item| item.except(:categoryCuid, :cuid).reject {|k, v| v.nil?} }
      category.merge(items_attributes: items_attributes)
    end

    categories.to_a.map { |category| category.except(:cuid).reject {|k, v| v.nil?} }
  end
end
