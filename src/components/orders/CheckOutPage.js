import React, { Component } from 'react'

import { FormGroup, FormControl } from '../locations/formComponents/elements'
import { saveOrder, checkOut, updateOrder } from '../../actions/orderActions'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BCol, Row, Radio, FormRow, FormCheck, Btn, DFlex } from '../elements';

import Icon from '@fortawesome/react-fontawesome'

class CheckOutPage extends Component {
  render() {
    return (
      <div>
        <Row>
          <BCol>
            <FormGroup>
              <Btn opt='primary' onClick={this.goBack} >
                <Icon icon='arrow-left' /> Go Back
              </Btn>
            </FormGroup>

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />

            </FormGroup>

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />
                
            </FormGroup>
          </BCol>

          <BCol>
            <h4>Current Order</h4>

            <CurrentOrderDisplay orderItems={this.props.orderItems} />

            <FormGroup>
              <div className='input-group'>
                <div className='input-group-prepend' >
                  <span className='input-group-text' >$</span>
                </div>
                <FormControl placeholder='Tip' />
              </div>
            </FormGroup>

          </BCol>
        </Row>

        <div className='text-right'>
          <Btn opt='success' onClick={this.saveOrder} ><Icon icon='check' /> Save Order</Btn>
        </div>
      </div>
    )
  }

  saveOrder = () => this.props.saveOrder()
  goBack = () => this.props.checkOut()

  onChange = event => {
    const { name, value } = event.target
    this.props.updateOrder({ [name]: value })
  }
}

const mapState = state => {
  const order = state.order.order
  return {
    orderItems: state.order.items,
    ...order
  }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder, updateOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)