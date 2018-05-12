import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { saveOrder, checkOut } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex, Btn } from '../elements'

class CurrentOrder extends React.Component {
  render() {
    return (
      <div>
        <h4>Current Order</h4>

        <CurrentOrderDisplay edit orderItems={this.props.orderItems} />

        <DFlex>
          <Btn success opt='ml-auto' onClick={this.checkOut} >
            Check Out <Icon icon='arrow-right' />
          </Btn>
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

export default connect(mapState, mapDispatch)(CurrentOrder)