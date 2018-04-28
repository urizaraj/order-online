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

  addItem = () => this.props.addItem(this.props.cuid, this.props.id)

  removeCategory = () => this.props.removeCategory(this.props.cuid)
}

const mapState = (state, ownProps) => {
  let items = state.newLocation.items

  const [key, itemKey] = (ownProps.id ? ['id', 'category_id'] : ['cuid', 'categoryCuid'])

  items = items.filter(item => {
    return item[itemKey] === ownProps[key]
  })

  return { items }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ updateCategory, removeCategory, addItem }, dispatch)
}

export default connect(mapState, mapDispatch)(Category)