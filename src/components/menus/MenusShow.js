import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMenu } from '../../actions/menuActions'

import OrderNew from '../orders/OrderNew';

import Icon from '@fortawesome/react-fontawesome'

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

    if (this.props.loading) return <div><Icon icon="spinner" spin /></div>

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

const mapState = state => {
  return { categories: state.menu.categories, loading: state.menu.loading }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default MenusShow = connect(mapState, mapDispatch)(MenusShow)