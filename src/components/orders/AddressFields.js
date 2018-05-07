import React, { Component, Fragment } from 'react'
import { BCol, FormRow } from '../elements'
import { FormControl, FormGroup } from '../locations/formComponents/elements'
import { StateDataList } from '../states'

class AddressFields extends Component {
  render() {
    return (
      <Fragment>
        <FormGroup>
          <FormControl
            placeholder='Address'
            name='address'
            value={this.props.address}
            onChange={this.props.onChange} />

        </FormGroup>

        <FormRow opt='mb-3' >
          <BCol size='md-6' >
            <FormControl
              placeholder='City'
              name='city'
              value={this.props.city}
              onChange={this.props.onChange} />

          </BCol>

          <BCol>
            <FormControl
              placeholder='State'
              name='state'
              list='states'
              value={this.props.state}
              onChange={this.props.onChange} />

            <StateDataList />
          </BCol>

          <BCol>
            <FormControl
              placeholder='Zipcode'
              name='zipcode'
              value={this.props.zipcode}
              onChange={this.props.onZipChange} />
          </BCol>
        </FormRow>
      </Fragment>
    )
  }
}

export default AddressFields