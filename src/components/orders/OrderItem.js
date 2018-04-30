import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeOrderItem } from '../../actions/orderActions'

import Icon from '@fortawesome/react-fontawesome'

import { DFlex } from '../elements'

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.itemPrice = props.selectedOptions.reduce((total, option) => {
      return total + option.price
    }, props.price)
  }

  render() {
    return (
      <DFlex>
        <div className='p-2' >
          <button onClick={this.removeOrderItem} className='btn btn-link' ><Icon icon='times' /></button> {this.props.name}
        </div>
        <div className='ml-auto align-self-center p-2' >
          ${this.itemPrice}
        </div>
      </DFlex>
    )
  }

  removeOrderItem = () => this.props.removeOrderItem(this.props.cuid)
}

const mapDispatch = dispatch => {
  const actions = { removeOrderItem }
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatch)(OrderItem)