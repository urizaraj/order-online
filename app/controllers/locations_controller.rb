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

    categories, items, options = location.values_at(:categories, :items, :options)

    {
      id: location[:id],
      name: location[:name],
      description: location[:description],
      menu_attributes: {
        id: location[:menuId],
        categories_attributes: categories_attributes(categories, items, options)
      }
    }.compact
  end

  def categories_attributes(categories, items, options)
    keys = %w[id name menu_id]
    categories.map do |category|
      c_items = matcher(category, items, :category_id, :categoryCuid)
      h = category.select { |key, _v| keys.include?(key) }
      h.merge(items_attributes: items_attributes(c_items, options))
    end
  end

  def items_attributes(items, options)
    keys = %w[id name description price category_id]
    items.map do |item|
      i_options = matcher(item, options, :item_id, :itemCuid)
      h = item.select { |key, _v| keys.include?(key) }
      h.merge(options_attributes: options_attributes(i_options))
    end
  end

  def options_attributes(options)
    keys = %w[id name price item_id]
    options.map { |option| option.select { |key, v| keys.include?(key) && (key != 'price' || v != '' ) } }
  end

  def matcher(parent, children, id, cuid)
    children.select do |child|
      if child[id]
        child[id] == parent[:id]
      else
        child[cuid] == parent[:cuid]
      end
    end
  end
end
