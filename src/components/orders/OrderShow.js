import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder } from '../../actions/orderActions'
import { resetOrder } from '../../actions/orderNewActions'

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
  const { id, ...props } = state.orderNew
  return { ...props }
}

const mapDispatch = dispatch => {
  const actions = { fetchOrder, resetOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(OrderShow)