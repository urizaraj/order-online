# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

organic = Location.create({
  name: 'Oooh, Organic!',
  description: 'Fresh, delicious organic food'
})

menu = organic.menus.create()

sandwiches = menu.categories.create({name: 'Sandwiches'})

sandwiches.items.create({
  name: 'Grilled Chicken Sandwich',
  description: 'Grilled chicken on a kaiser roll with lettuce and tomato',
  price: 6.00
})