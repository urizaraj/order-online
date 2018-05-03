import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormRow, FormControl, RemoveButton } from './elements'
import { BCol } from '../../elements'

import { updateOption, removeOption } from '../../../actions/newLocationActions'

class Option extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <BCol >
            <FormControl
              onChange={this.handleChange}
              value={this.props.name}
              name='name'
              placeholder='Option Name' />
          </BCol>

          <BCol size='md-2 col'>
            <FormControl
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              name='price'
              value={this.props.price}
              placeholder='Price' />

          </BCol>

          <BCol size='auto'  >
            <RemoveButton onClick={this.removeOption} />
          </BCol>
        </FormRow>
      </div>
    )
  }

  handleChange = event => {
    const { name, value } = event.target
    this.props.updateOption(this.props.cuid, { [name]: value })
  }

  handleBlur = event => {
    const price = parseFloat(event.target.value)
    this.props.updateOption(this.props.cuid, {
      price: (price ? price : 0).toFixed(2)
    })
  }

  removeOption = () => this.props.removeOption(this.props.cuid)
}

const mapOptionDispatch = dispatch => {
  return bindActionCreators({ updateOption, removeOption }, dispatch)
}

export default connect(null, mapOptionDispatch)(Option)