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
  }

  render() {

    if (this.props.saved) return <OrderSavedPrompt resetOrder={this.resetOrder} />

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

  resetOrder = () => this.props.resetOrder()

  componentWillUnmount() {
    this.resetOrder()
  }
}

const OrderSavedPrompt = props => {
  return (
    <div>
      <h1>
        Order Saved!
      </h1>

      <button className='btn btn-success' onClick={props.resetOrder} >
        New Order
      </button>
    </div>
  )
}

const ItemList = ({ items }) => {
  return items.map(item => <Item {...item} key={item.id} />)
}

// connecting to the store

const mapState = state => {
  return {
    categories: state.menu.categories,
    selectedOptions: state.activeItem.options,
    saved: state.order.saved
  }
}

const mapDispatch = dispatch => {
  const actions = { resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default OrderNew = connect(mapState, mapDispatch)(OrderNew)