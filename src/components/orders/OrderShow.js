import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchOrder } from '../../actions/orderActions'
import { resetOrder } from '../../actions/orderNewActions'

import CurrentOrderDisplay from './CurrentOrderDisplay'

class OrderShow extends Component {
  render() {
    const {
      address,
      city,
      state,
      zipcode,
      deliveryType,
      fullName,
      paymentType
    } = this.props
    return (
      <div>
        <h4>{this.props.locationName}</h4>
        <CurrentOrderDisplay orderItems={this.props.orderItems} />

        <h4>Order Information</h4>
        <div>
          <div className="mb-2">
            <Badge text={paymentType} /> <Badge text={deliveryType} />
          </div>
          <div>{fullName}</div>
          <div>{address}</div>
          <div>
            {city}, {state} {zipcode}
          </div>
        </div>
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

const Badge = props => {
  const { text } = props
  return <span className="badge badge-secondary text-capitalize">{text}</span>
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
