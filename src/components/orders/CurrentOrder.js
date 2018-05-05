import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { saveOrder, checkOut } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

class CurrentOrder extends React.Component {
  render() {
    return (
      <div>
        <h4>Current Order</h4>

        <CurrentOrderDisplay edit orderItems={this.props.orderItems} />

        <DFlex>
          <button className='btn btn-success ml-auto' onClick={this.checkOut} >
            Check Out <Icon icon='arrow-right' />
          </button>
        </DFlex>
      </div>
    )
  }

  saveOrder = event => this.props.saveOrder()
  checkOut = event => this.props.checkOut()
}

const mapState = state => {
  return {
    orderItems: state.orderNew.orderItems
  }
}

const mapDispatch = dispatch => {
  const actions = { saveOrder, checkOut }
  return bindActionCreators(actions, dispatch)
}

export default CurrentOrder = connect(mapState, mapDispatch)(CurrentOrder)