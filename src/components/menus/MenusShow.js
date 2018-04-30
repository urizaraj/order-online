import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMenu } from '../../actions/menuActions'

import OrderNew from '../orders/OrderNew';

import Icon from '@fortawesome/react-fontawesome'
import { DFlex } from '../elements'

class MenusShow extends Component {
  render() {

    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        <h1>Menu</h1>
        <CategoryList categories={this.props.categories} />
        <hr />
        <OrderNew categories={this.props.categories} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchMenu(this.props.id)
  }
}

const CategoryList = ({ categories }) => categories.map(category => <Category {...{ ...category, key: category.id }} />)

const Category = props => {
  return (
    <div className='mb-3' >
      <h2 className='text-primary' >{props.name}</h2>
      <ItemList items={props.items} />
    </div>
  )
}

const ItemList = ({ items }) => items.map(item => <Item {...{ ...item, key: item.id }} />)


const Item = ({ name, description, price }) => {
  return (
    <div className='mb-2' >

      <DFlex>
        <h3 className='mb-0' >{name}</h3>
        <h3 className='mb-0 ml-3 text-muted ' >${price}</h3>
      </DFlex>

      <small>{description}</small>
    </div>
  )
}

// store

const mapState = state => {
  return {
    categories: state.menu.categories,
    loading: state.menu.loading,
    id: state.locations.location.menu.id
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ fetchMenu }, dispatch)
}

export default MenusShow = connect(mapState, mapDispatch)(MenusShow)