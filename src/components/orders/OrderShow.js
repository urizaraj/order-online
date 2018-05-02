import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder, resetOrder } from '../../actions/orderActions'

import OrderItem from './OrderItem'

import CurrentOrderDisplay from "./CurrentOrderDisplay"

class OrderShow extends Component {
  render() {
    const orderItems = this.props.items.map(oi => {
      return {
        selectedOptions: oi.selected_options,
        name: oi.name,
        price: oi.price
      }
    })

    return (
      <div>
        <CurrentOrderDisplay orderItems={orderItems} />
      </div>
    )
  }

  fetchOrder = () => this.props.fetchOrder(this.props.id)

  componentDidMount() {
    this.fetchOrder()
  }

  componentWillUnmount() {
    this.props.resetOrder()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) this.fetchOrder()
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