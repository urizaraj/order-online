import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Item from './Item'
import CurrentOrder from './CurrentOrder'
import { resetOrder } from '../../actions/orderActions'

import { Row, BCol } from '../elements'

class OrderNew extends Component {
  constructor() {
    super()

    this.state = {
      currentItems: [],
    }
  }

  render() {
    const items = []
    this.props.categories.forEach(category => {
      category.items.forEach(item => items.push(item))
    })

    return (
      <div>
        <Row>
          <BCol>
            <ItemList {...{ items }} />
          </BCol>
          <BCol>
            <CurrentOrder {...{ items }} />
          </BCol>
        </Row>
      </div>
    )
  }

  componentWillUnmount() {
    this.props.resetOrder()
  }
}

const ItemList = ({ items }) => {
  return items.map(item => <Item {...item} key={item.id} />)
}

// connecting to the store

const mapState = state => {
  return { selectedOptions: state.activeItem.options }
}

const mapDispatch = dispatch => {
  const actions = { resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default OrderNew = connect(mapState, mapDispatch)(OrderNew)