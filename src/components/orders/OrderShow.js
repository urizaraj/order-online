import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder, resetOrder } from '../../actions/orderActions'

class OrderShow extends Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => <strong className='p-3'>{item.name}</strong>)}
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