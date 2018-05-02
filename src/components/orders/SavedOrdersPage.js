import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Row, BCol } from '../elements'

import OrderShow from './OrderShow';

import { fetchOrderIndex } from '../../actions/orderActions'

class SavedOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: null
    }
  }

  render() {
    return (
      <div>
        <Row>
          <BCol>
            <OrderList
              orders={this.props.orders}
              handleClick={this.handleClick}
              currentOrder={this.state.currentOrder} />
          </BCol>

          <BCol>
            {this.state.currentOrder && <OrderShow id={this.state.currentOrder} />}
          </BCol>
        </Row>

      </div>
    )
  }

  componentDidMount() {
    this.props.fetchOrderIndex()
  }

  handleClick = id => {
    this.setState({
      currentOrder: id
    })
  }
}

const OrderList = props => {
  return props.orders.map(order => {
    return (
      <Order {...order}
        key={order.id}
        handleClick={props.handleClick}
        active={props.currentOrder === order.id} />
    )
  })
}

const Order = props => {
  const { created_at, location_name, id, handleClick, active } = props
  const date = new Date(created_at).toDateString()
  let opt

  if (active) {
    opt = 'align-items-center bg-primary py-2 text-light'
  } else {
    opt = 'align-items-center'
  }

  return (
    <div>
      <Row opt={opt} onClick={() => handleClick(id)} >
        <BCol>
          <h4 className='mb-0' >
            {location_name}
          </h4>
          <small>
            {date}
          </small>
        </BCol>
      </Row>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    orders: state.order.index
  }
}

const mapDispatch = dispatch => {
  const actions = { fetchOrderIndex }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(SavedOrdersPage)