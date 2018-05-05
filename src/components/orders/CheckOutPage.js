import Icon from '@fortawesome/react-fontawesome';
import pick from 'lodash/pick';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BCol, Btn, FormRow, Row } from '../elements';
import { FormControl, FormGroup } from '../locations/formComponents/elements';
import AddressFields from './AddressFields';
import CurrentOrderDisplay from './CurrentOrderDisplay';
import DeliveryTypeRadio from './DeliveryTypeRadio';
import PaymentTypeRadio from './PaymentTypeRadio';
import { checkOut, saveOrder } from '../../actions/orderActions'
import { updateOrder } from '../../actions/orderNewActions'

class CheckOutPage extends Component {
  render() {
    const cash = this.props.paymentType === 'cash'
    const card = this.props.paymentType === 'card'
    const pickup = this.props.deliveryType === 'pickup'
    const delivery = this.props.deliveryType === 'delivery'
    return (
      <div>
        <Row>
          <BCol>
            <DeliveryTypeRadio onChange={this.onChange} delivery={delivery} pickup={pickup} />

            <FormGroup>
              <FormControl
                placeholder='Full Name'
                name='fullName'
                value={this.props.fullName}
                onChange={this.onChange} />

            </FormGroup>

            <AddressFields
              onChange={this.onChange}
              onZipChange={this.onZipChange}
              {...pick(this.props, ['address', 'city', 'state', 'zipcode'])} />

            <PaymentTypeRadio onChange={this.onChange} cash={cash} card={card} />

            <FormGroup>
              <FormControl
                disabled={!card}
                placeholder='Card Number'
                name='cardNumber'
                value={this.props.cardNumber}
                onChange={this.onChange} />
            </FormGroup>
          </BCol>

          <BCol>
            <h4>Current Order</h4>

            <CurrentOrderDisplay orderItems={this.props.orderItems} />

            <FormGroup>
              <FormRow>
                <BCol>
                  <h4>Tip</h4>
                </BCol>
                <BCol>
                  <div className='input-group'>
                    <div className='input-group-prepend' >
                      <span className='input-group-text' >$</span>
                    </div>
                    <FormControl
                      placeholder='Tip'
                      name='tip'
                      value={this.props.tip}
                      onChange={this.onChange}
                      onBlur={this.onTipBlur} />

                  </div>
                </BCol>
              </FormRow>
            </FormGroup>

          </BCol>
        </Row>

        <div className='text-right'>
          <Btn opt='primary' onClick={this.goBack} > <Icon icon='arrow-left' /> Go Back </Btn>
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

  onZipChange = event => {
    const zipcode = event.target.value

    if (zipcode === '' || zipcode === '0') {
      this.props.updateOrder({ zipcode })
    } else if (zipcode.length > 5) {
      return
    } else if (!parseInt(zipcode, 10)) {
      return
    } else {
      this.props.updateOrder({ zipcode })
    }
  }

  onTipBlur = event => {
    const tip = parseFloat(event.target.value)
    this.props.updateOrder({
      tip: (tip ? tip : 0).toFixed(2)
    })
  }
}

const mapState = state => {
  const order = state.orderNew
  return { ...order }
}

const mapDispatch = dispatch => {
  const actions = { checkOut, saveOrder, updateOrder }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(CheckOutPage)