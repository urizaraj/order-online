import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import defaultTo from 'lodash/defaultTo'
import { Link } from 'react-router-dom'

import { Row, BCol, Btn } from '../elements'

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
    const page = parseInt(defaultTo(this.props.match.params.page, 1))

    return (
      <div>
        <Row opt='mb-3' >
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

        <Row>
          <BCol size='auto'>
            <Link to={`/user/saved_orders/page/${Math.max((page - 1), 1)}`} >Prev</Link>
          </BCol>
          <BCol size='auto' >
            {page}
          </BCol>
          <BCol size='auto' >
            <Link to={`/user/saved_orders/page/${page + 1}`} >Next</Link>
          </BCol>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchOrderIndex(this.props.match.params.page)
  }

  componentDidUpdate(props) {
    if (props.match.params.page !== this.props.match.params.page) {
      this.props.fetchOrderIndex(this.props.match.params.page)
    }
    // 
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