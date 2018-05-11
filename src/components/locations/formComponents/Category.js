import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BCol, FormControl, FormRow } from '../../elements';
import Item from './Item';
import { AddButton, RemoveButton } from './elements';
import { addItem, updateResource, removeResource } from '../../../actions/newLocationActions'

class Category extends Component {
  render() {
    const disabled = this.props['_destroy']
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <BCol >
            <FormControl
              disabled={disabled}
              placeholder='Category Name'
              value={this.props.name}
              onChange={this.handleChange} />
          </BCol>

          <BCol size='auto' opt='mb-3' >
            <RemoveButton onClick={this.removeAction} />
          </BCol>
        </FormRow>

        <AddButton onClick={this.addItem} disabled={disabled} type='Item' />

        {!disabled && this.props.items.map(item => <Item {...item} key={item.cuid} />)}

      </div>
    )
  }

  handleChange = event => {
    const name = event.target.value
    this.updateCategory({ name })
  }

  addItem = () => this.props.addItem(this.props.cuid, this.props.id)

  updateCategory = value => this.props.updateResource('categories', this.props.cuid, value)

  removeCategory = () => this.props.removeResource('categories', this.props.cuid)

  removeExisting = () => this.props.updateResource('categories', this.props.cuid, { '_destroy': !this.props['_destroy'] })

  removeAction = this.props.id ? this.removeExisting : this.removeCategory
}

const mapState = (state, ownProps) => {
  let items = state.locationNew.items

  const [key, itemKey] = (ownProps.id ? ['id', 'category_id'] : ['cuid', 'categoryCuid'])

  items = items.filter(item => {
    return item[itemKey] === ownProps[key]
  })

  return { items }
}

const mapDispatch = dispatch => {
  return bindActionCreators({ updateResource, removeResource, addItem }, dispatch)
}

export default connect(mapState, mapDispatch)(Category)