import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateCategory, removeCategory, addItem } from '../../../actions/newLocationActions'

import { FormRow, FormControl, AddButton, RemoveButton } from './elements'
import { Col as Bcol } from '../../elements'
import Item from './Item'

class Category extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <Bcol size='auto' opt='mb-3' >
            <RemoveButton onClick={this.removeCategory} />
          </Bcol>

          <Bcol>
            <FormControl
              placeholder='Category Name'
              value={this.props.name}
              onChange={this.handleChange} />
          </Bcol>
        </FormRow>

        <AddButton onClick={this.addItem} type='Item' />

        {this.props.items.map(item => <Item {...item} key={item.cuid} />)}

      </div>
    )
  }

  handleChange = event => {
    const name = event.target.value
    this.props.updateCategory(this.props.cuid, { name })
  }

  addItem = () => this.props.addItem(this.props.cuid)

  removeCategory = () => this.props.removeCategory(this.props.cuid)
}


const mapState = (state, ownProps) => {
  return {
    items: state.newLocation.items.filter(item => {
      return item.category_id === ownProps.id
    })
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ updateCategory, removeCategory, addItem }, dispatch)
}

export default connect(mapState, mapDispatch)(Category)