import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder } from '../actions/orderActions'

class OrderShow extends Component {
  render() {
    return (
      <div>
        this is the order show
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.id)
  }
}

const mapState = state => {
  return {
    items: state.order.items,
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(OrderShow)