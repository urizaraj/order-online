import React, { Component } from 'react'
import { Row, Col as BCol } from './elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import OrderShow from './OrderShow';

class SavedOrdersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentOrder: null
    }

    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <OrderList
          orders={this.state.orders}
          handleClick={this.handleClick}
          currentOrder={this.state.currentOrder} />
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

  handleClick(id) {
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
  return (
    <div>
      <Row opt='align-items-center' onClick={() => handleClick(id)} >
        <BCol>
          <small>
            {created_at}
          </small>
        </BCol>

        <BCol>
          <h4>
            {location_name}
          </h4>
        </BCol>
      </Row>
      {active && <OrderShow id={id} />}
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(SavedOrdersPage)

// 