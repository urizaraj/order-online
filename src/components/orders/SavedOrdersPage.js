import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Row, BCol, Pagination, DFlex } from '../elements'

import OrderShow from './OrderShow';

import { fetchOrderIndex } from '../../actions/orderActions'

class SavedOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrder: null,
      page: 1
    }
  }

  render() {
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

        <Pagination
          page={this.state.page}
          prevPage={this.prevPage}
          nextPage={this.nextPage} />
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchOrderIndex()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.props.fetchOrderIndex(this.state.page)
    }
  }

  handleClick = id => {
    this.setState({
      currentOrder: id
    })
  }

  nextPage = () => this.setState(({ page }) => ({ page: page + 1 }))

  prevPage = () => this.setState(({ page }) => ({ page: page - 1 }))
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
  let opt = 'mb-3'

  if (active) {
    opt += ' blue-left-border'
  }

  return (
    <div className={opt} onClick={() => handleClick(id)} >
      <h4 className='mb-1' >{location_name}</h4>
      {date}
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