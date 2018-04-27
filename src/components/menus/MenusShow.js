import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMenu } from '../../actions/menuActions'

import OrderNew from '../orders/OrderNew';

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

const CategoryList = ({categories}) => categories.map(category => e(Category, {...category, key: category.id}))

class MenusShow extends Component {
  render() {
    return (
      <div>
        <h1>Menu</h1>
        <CategoryList categories={this.props.categories} />
        <hr/>
        <OrderNew categories={this.props.categories} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchMenu(this.props.match.params.menuId)
  }
}

const mapStateToProps = state => {
  return { categories: state.menu.categories }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default MenusShow = connect(mapStateToProps, mapDispatchToProps)(MenusShow)