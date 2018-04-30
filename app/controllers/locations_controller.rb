# frozen_string_literal: true

class LocationsController < ApplicationController
  def index
    render json: Location.all
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
      .permit(
        :name,
        :description,
        menus_attributes: [
          categories_attributes: [
            :name,
            items_attributes: [
              :name,
              :price,
              options_attributes: %i[
                name
                price
              ]
            ]
          ]
        ]
      )
  end

  def stronger_params
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
    categories = stronger_params[:categories]
    items = stronger_params[:items]
    options = stronger_params[:options]
    location = stronger_params

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
    categories.map do |category|
      c_items = items.select do |item|
        if item[:category_id]
          item[:category_id] == category[:id]
        else
          item[:categoryCuid] == category[:cuid]
        end
      end

      {
        id: category[:id],
        name: category[:name],
        menu_id: category[:menu_id],
        items_attributes: items_attributes(c_items, options)
      }.compact
    end
  end

  def items_attributes(items, options)
    items.map do |item|
      i_options = options.select do |option|
        if option[:item_id]
          option[:item_id] == item[:id]
        else
          option[:itemCuid] == item[:cuid]
        end
      end

      {
        id: item[:id],
        name: item[:name],
        description: item[:description],
        price: item[:price],
        category_id: item[:category_id],
        options_attributes: options_attributes(i_options)
      }.compact
    end
  end

  def options_attributes(options)
    options.map do |option|
      {
        id: option[:id],
        name: option[:name],
        price: option[:price],
        item_id: option[:item_id]
      }.compact
    end
  end
end
