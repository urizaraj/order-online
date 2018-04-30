import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMenu } from '../../actions/menuActions'

import OrderNew from '../orders/OrderNew';

import Icon from '@fortawesome/react-fontawesome'

class MenusShow extends Component {
  render() {

    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

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

const CategoryList = ({categories}) => categories.map(category => <Category {...{...category, key: category.id}} />)

const Category = props => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ItemList items={props.items} />
    </div>
  )
}

const ItemList = ({items}) => items.map(item => <Item {...{...item, key: item.id}} />)

const Item = ({ name, description, price }) => {
  return (
    <div>
      <h3>{name}</h3>
      <small>{description} - {price}</small> 
    </div>
  )
}

// store

const mapState = state => {
  return { categories: state.menu.categories, loading: state.menu.loading }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default MenusShow = connect(mapState, mapDispatch)(MenusShow)