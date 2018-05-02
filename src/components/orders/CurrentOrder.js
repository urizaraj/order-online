import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { saveOrder } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

class CurrentOrder extends React.Component {
  render() {
    return (
      <div>
        <h4>Current Order</h4>

        <CurrentOrderDisplay edit orderItems={this.props.orderItems} />

        <DFlex>
          <button className='btn btn-success ml-auto' onClick={this.saveOrder} >
            <Icon icon='check' /> Save Order
          </button>
        </DFlex>
      </div>
    )
  }

  saveOrder = event => this.props.saveOrder()
}

const mapState = state => {
  return {
    orderItems: state.order.items
  }
}

const mapDispatch = dispatch => {
  const actions = { saveOrder }
  return bindActionCreators(actions, dispatch)
}

export default CurrentOrder = connect(mapState, mapDispatch)(CurrentOrder)