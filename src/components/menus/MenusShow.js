import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMenu } from '../../actions/menuActions'

import Icon from '@fortawesome/react-fontawesome'
import { DFlex, Row, BCol } from '../elements'

class MenusShow extends Component {
  render() {

    if (this.props.loading) return <div className='text-center' ><Icon icon="spinner" spin size='2x' /></div>

    return (
      <div>
        <Row>
          <CategoryList categories={this.props.categories} />
        </Row>
      </div>
    )
  }
}

const CategoryList = ({ categories }) => categories.map(category => (
  <Category {...category} key={category.id} />
))

const Category = props => {
  return (
    <BCol size='md-6' >
      <h2 className='text-primary' >{props.name}</h2>

      <div className='blue-left-border' >
        <ItemList items={props.items} />
      </div>
    </BCol>
  )
}

const ItemList = ({ items }) => items.map(item => <Item {...item} key={item.id} />)


const Item = ({ name, description, price }) => {
  return (
    <div className='mb-2' >

      <DFlex>
        <h3 className='mb-0' >{name}</h3>
        <h3 className='mb-0 ml-auto font-weight-light' >${price}</h3>
      </DFlex>

      <div className='' >
        {description}
      </div>
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