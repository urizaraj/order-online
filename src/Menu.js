import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchMenu } from './actions/menuActions'

const e = React.createElement

const Item = ({ name, description, price }) => {
  return (
    <div>
      <h3>{name}</h3>
      <small>{description} - {price}</small> 
    </div>
  )
}

const ItemList = ({items}) => items.map(item => e(Item, {...item, key: item.id}))

const Category = props => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ItemList items={props.items} />
    </div>
  )
}

class Menu extends Component {
  render() {
    const categoryList = this.props.categories.map(category => <Category {...category} key={category.id} />)
    return (
      <div>
        <h1>Menu</h1>
        {categoryList}
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchMenu()
  }
}

const mapStateToProps = state => {
  return { categories: state.menu.categories }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default Menu = connect(mapStateToProps, mapDispatchToProps)(Menu)