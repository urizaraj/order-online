# frozen_string_literal: true

class LocationsController < ApplicationController
  before_action :authenticate_or_request, only: %i[create update]
  before_action :find_location, only: %i[show update]

  def index
    page = params[:page].to_i || 1
    offset = (page - 1) * 4
    locations = Location.limit(4).offset(offset)

    render json: locations, each_serializer: LocationIndexSerializer
  end

  def show
    render json: @location,
           serializer: params[:edit] ? LocationEditSerializer : LocationSerializer
  end

  def create
    location = Location.new(params_to_attributes)
    status = location.save
    render json: { saved: status }
  end

  def update
    @location.update(params_to_attributes)
    render json: @location, serializer: LocationEditSerializer
  end

  private

  def find_location
    @location = Location.find(params[:id])
  end

  def strong_params
    params
      .require(:location)
      .permit :name,
              :description,
              :id,
              :menuId,
              categories: %i[id cuid name description menu_id _destroy],
              items: %i[id cuid name description price category_id categoryCuid _destroy],
              options: %i[id cuid name price item_id itemCuid _destroy]
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

    items = map_resource :items, :itemCuid, options, :options_attributes

    items = items.group_by do |item|
      item['category_id'] || item['categoryCuid']
    end

    categories = map_resource :categories, :categoryCuid, items, :items_attributes

    categories.map { |category| category.except(:cuid).reject { |_k, v| v.nil? } }
  end

  def map_resource(resource, cuid, children, child_attributes)
    strong_params[resource].map do |r|
      key = r['id'] || r['cuid']
      a = children_to_attributes children[key], cuid
      r.merge(child_attributes => a)
    end
  end

  def children_to_attributes(children, parent_cuid)
    children.to_a.map do |resource|
      resource.except(parent_cuid, :cuid).reject { |_k, v| v.nil? }
    end
  end
end
