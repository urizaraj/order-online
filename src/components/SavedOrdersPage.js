import React, { Component } from 'react'
import { DFlex } from './elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import OrderShow from './OrderShow';

class SavedOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  render() {
    return (
      <div>
        <OrderList orders={this.state.orders} />
      </div>
    )
  }

  componentDidMount() {
    if (!this.props.user.signedIn) return
    const url = `/users/${this.props.user.id}`
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        this.setState({
          orders: resp.orders
        })
      })
  }
}

const OrderList = props => {
  return props.orders.map(order => {
    return (
      <Order {...order} key={order.id} />
    )
  })
}

const Order = props => {
  const { created_at, location_name, id } = props
  return (
    <DFlex opt='align-items-center'>
      <small>
        {created_at}
      </small>
      <h4>
        {location_name}
      </h4>
    </DFlex>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SavedOrdersPage)