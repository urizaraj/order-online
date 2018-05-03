import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder, resetOrder } from '../../actions/orderActions'

import CurrentOrderDisplay from "./CurrentOrderDisplay"

class OrderShow extends Component {
  render() {
    return (
      <div>
        <CurrentOrderDisplay orderItems={this.props.orderItems} />
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

const mapState = state => {
  return {
    orderItems: state.order.items.map(oi => {
      return {
        selectedOptions: oi.selected_options,
        instructions: oi.instructions,
        name: oi.name,
        price: oi.price
      }
    })
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchOrder, resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(OrderShow)