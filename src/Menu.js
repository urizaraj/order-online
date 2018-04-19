import React, { Component } from 'react';

const e = React.createElement

const Category = props => (
  <div>
    <button
      onClick={() => props.onClick(props.id)}
    >Load</button>
    {props.name}
  </div>
)

const Item = ({name, description, price}) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <h3>{price}</h3>
    </div>
  )
}

class Menu extends Component {
  constructor() {
    super()

    this.state = {
      categories: [],
      items: []
    }
  }

  render() {
    const categoryList = this.state.categories.map(category => {
      const options = {
        ...category,
        onClick: this.fetchCategory.bind(this)
      }
      return e(Category, options)
    })

    const itemList = this.state.items.map(item => e(Item, item))

    return (
      <div>
        we in the menu right now
        {categoryList}
        {itemList}
      </div>
    )
  }

  componentDidMount() {
    this.fetchMenu()
  }

  fetchMenu() {
    fetch('/menus/1')
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        this.setState({
          categories: resp.categories
        })
      })
  }

  fetchCategory(id) {
    fetch(`/categories/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          items: resp.items
        })
      })
  }
}

export default Menu