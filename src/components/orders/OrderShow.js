import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder, resetOrder } from '../../actions/orderActions'

import OrderItem from './OrderItem'

class OrderShow extends Component {
  render() {
    return (
      <div>
        <OrderItemList orderItems={this.props.items} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.id)
  }

  componentWillUnmount() {
    this.props.resetOrder()
  }
}

const OrderItemList = ({ orderItems }) => orderItems.map(oi => {
  return <OrderItem
    selectedOptions={oi.selected_options}
    name={oi.name}
    price={oi.price} />
})

const mapState = state => {
  return {
    items: state.order.items,
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchOrder, resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(OrderShow)