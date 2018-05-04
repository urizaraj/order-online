import React, { Component } from 'react'

import { FormGroup, FormControl } from '../locations/formComponents/elements'
import { saveOrder, checkOut } from '../../actions/orderActions'

import CurrentOrderDisplay from './CurrentOrderDisplay'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BCol, Row, Radio, FormRow, FormCheck, Btn, DFlex } from '../elements';

import Icon from '@fortawesome/react-fontawesome'

class CheckOutPage extends Component {
  constructor() {
    super()
    this.state = {
      payment: 'cash',
    }
  }
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
              <FormControl placeholder='Full Name' />
            </FormGroup>

            <FormGroup>
              <FormControl placeholder='Address' />
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
  togglePayment = event => {

  }
  onChange = event => this.setState({ payment: event.target.value })
  saveOrder = () => this.props.saveOrder()
  goBack = () => this.props.checkOut()
}

const mapState = state => {
  return { orderItems: state.order.items }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)