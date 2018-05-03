import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormGroup, FormRow, FormControl, AddButton, RemoveButton } from './elements'
import { BCol } from '../../elements'
import Option from './Option'
import { addOption, updateResource, removeResource } from '../../../actions/newLocationActions'

class Item extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <BCol>
            <FormControl
              placeholder='Item Name'
              name='name'
              onChange={this.handleChange}
              value={this.props.name} />
          </BCol>

          <BCol size='md-2 col' >
            <FormControl
              placeholder='Price'
              name='price'
              onChange={this.handleChange}
              onBlur={this.handlePrice}
              value={this.props.price} />
          </BCol>

          <BCol size='auto' opt='mb-3' >
            <RemoveButton onClick={this.removeItem} />
          </BCol>
        </FormRow>

        <FormGroup>
          <FormControl placeholder='Description'
            name='description'
            onChange={this.handleChange}
            value={this.props.description} />

        </FormGroup>

        <AddButton onClick={this.handleNewOption} type='Option' />

        {this.props.options.map(option => <Option {...option} key={option.cuid} />)}

      </div>
    )
  }

  handleChange = event => {
    const { name, value } = event.target
    this.updateItem({ [name]: value })
  }

  handlePrice = event => {
    const price = parseFloat(event.target.value)
    this.updateItem({
      price: (price ? price : 0).toFixed(2)
    })
  }

  handleNewOption = () => this.props.addOption(this.props.cuid, this.props.id)

  removeItem = () => this.props.removeResource('items', this.props.cuid)

  updateItem = value => this.props.updateResource('items', this.props.cuid, value)
}

const mapState = (state, ownProps) => {
  const options = state.newLocation.options
  let filter

  if (ownProps.id) {
    filter = option => option.item_id === ownProps.id
  } else {
    filter = option => option.itemCuid === ownProps.cuid
  }

  return { options: options.filter(filter) }
}

const mapDispatch = dispatch => {
  const actions = { addOption, updateResource, removeResource }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapState, mapDispatch)(Item)