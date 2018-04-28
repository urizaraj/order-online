import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { FormGroup, FormRow, FormControl, AddButton, RemoveButton } from './elements'
import { Col as Bcol } from '../../elements'
import Option from './Option'
import { updateItem, addOption, removeItem } from '../../../actions/newLocationActions'

class Item extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <Bcol size='auto' opt='mb-3' >
            <RemoveButton onClick={this.removeItem} />
          </Bcol>

          <Bcol>
            <FormControl
              placeholder='Item Name'
              onChange={this.handleName}
              value={this.props.name} />
          </Bcol>

          <Bcol>
            <FormControl
              placeholder='Price'
              onChange={this.handlePrice}
              value={this.props.price} />
          </Bcol>
        </FormRow>
        <FormGroup>
          <FormControl placeholder='description'
            onChange={this.handleDescription}
            value={this.props.description} />
        </FormGroup>

        <AddButton onClick={this.handleNewOption} type='Option' />

        {this.props.options.map(option => <Option {...option} key={option.cuid} />)}

      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateItem(this.props.cuid, { name })
  }

  handleDescription = event => {
    const description = event.target.value
    this.props.updateItem(this.props.cuid, { description })
  }

  handlePrice = event => {
    let price = event.target.value
    if (price !== '') {
      price = parseInt(price, 10)
      if (!price) return
    }
    this.props.updateItem(this.props.cuid, { price })
  }

  handleNewOption = () => this.props.addOption(this.props.cuid, this.props.id)

  removeItem = () => this.props.removeItem(this.props.cuid)
}

const mapState = (state, ownProps) => {
  return {
    options: state.newLocation.options.filter(option => option.item_id === ownProps.id)
  }
}

const mapDispatch = dispatch => {
  const actions = { updateItem, addOption, removeItem }
  return bindActionCreators(actions, dispatch)
}

 export default connect(mapState, mapDispatch)(Item)