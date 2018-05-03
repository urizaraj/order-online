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
    const edit = this.props.edit
    return (
      <div>
        <DFlex>
          {edit && <RemoveButton onClick={this.removeOrderItem} />}

          <div className='p-2' >
            {this.props.name}
            <br />
            <SelectedOptionsList selectedOptions={this.props.selectedOptions} />
            <small><em>{this.props.instructions}</em></small>
          </div>

          <div className='ml-auto align-self-end p-2' >
            ${this.itemPrice}
          </div>
        </DFlex>

      </div>
    )
  }

  removeOrderItem = () => this.props.removeOrderItem(this.props.cuid)
}

const RemoveButton = props => <div><button {...props} className='btn btn-link' ><Icon icon='times' /></button></div>

const SelectedOptionsList = props => props.selectedOptions.map(so => <SelectedOption {...so} key={so.id} />)

const SelectedOption = props => {
  return (
    <DFlex>
      <div className='' >
        <small>
          {props.name}
        </small>
      </div>
      {props.price > 0 && (
        <div className='ml-3' >
          <small>
            ${props.price}
          </small>
        </div>
      )}
    </DFlex>
  )
}

const mapDispatch = dispatch => {
  const actions = { removeOrderItem }
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatch)(OrderItem)