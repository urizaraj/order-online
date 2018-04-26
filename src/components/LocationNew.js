//#region imports 

import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions/newLocationActions'

// import cuid from 'cuid'

import Icon from '@fortawesome/react-fontawesome'

import { Col as Bcol } from './elements'

//#endregion 

//#region presentational components

const FormGroup = props => <div className='form-group' >{props.children}</div>

const FormControl = props => <input {...props} type='text' className='form-control' />

const FormRow = props => <div className='form-row' >{props.children}</div>

const RemoveButton = props => <button className='btn btn-secondary' onClick={props.onClick} ><Icon icon='trash' /></button>

const AddButton = props => <button className='btn btn-success btn-sm mb-3' onClick={props.onClick} > <Icon icon='plus' /> New {props.type}</button>

//#endregion

class LocationNew extends Component {
  render() {
    return (
      <div>
        {/* <h1 className='text-primary bg-light display-4 p-3 d-inline-block' >New Location</h1> */}
        <h1>New Location</h1>

        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl placeholder='Location Name' name='name' onChange={this.handleChange} value={this.props.name} />
          </FormGroup>

          <FormGroup>
            <FormControl placeholder='Location Description' name='description' onChange={this.handleChange} value={this.props.description} />
          </FormGroup>

          <h2>Menu</h2>

          <AddButton onClick={this.props.addCategory} type='Category' />

          {this.props.categories.map(category => <Category {...category} key={category.cuid} />)}

          <div></div>
          <button
            onClick={this.props.saveLocation}
            className='btn btn-primary'
          >Save Location</button>
        </form>
      </div>
    )
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleChange = event => {
    const value = event.target.value
    const name = event.target.name

    const func = (name === 'name' ? this.props.updateLocationName : this.props.updateLocationDescription)

    func(value)
  }
}

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

        <AddButton onClick={this.handleNewOption} type='Option' />

        {this.props.options.map(option => <Option {...option} key={option.cuid} />)}

      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateItem(this.props.cuid, { name })
  }

  handlePrice = event => {
    let price = event.target.value
    if (price !== '') {
      price = parseInt(price, 10)
      if (!price) return
    }
    this.props.updateItem(this.props.cuid, { price })
  }

  handleNewOption = () => this.props.addOption(this.props.cuid)

  removeItem = () => this.props.removeItem(this.props.cuid)
}

class Option extends Component {
  render() {
    return (
      <div className='mb-3 ml-3' >
        <FormRow>
          <Bcol size='auto' >
            <RemoveButton onClick={this.removeOption} />
          </Bcol>

          <Bcol>
            <FormControl
              onChange={this.handleName}
              value={this.props.name}
              placeholder='Option Name' />
          </Bcol>

          <Bcol>
            <FormControl
              onChange={this.handlePrice}
              value={this.props.price}
              placeholder='Price' />
          </Bcol>
        </FormRow>

      </div>
    )
  }

  handleName = event => {
    const name = event.target.value
    this.props.updateOption(this.props.cuid, { name })
  }

  handlePrice = event => {
    let price = event.target.value
    if (price !== '') {
      price = parseInt(price, 10)
      if (!price) return
    }
    this.props.updateOption(this.props.cuid, { price })
  }

  removeOption = () => this.props.removeOption(this.props.cuid)

}

//#region store

const mapState = state => {
  return {
    categories: state.newLocation.categories,
    name: state.newLocation.name,
    description: state.newLocation.description
  }
}

const mapDispatch = dispatch => {
  const { addCategory, updateCategory, removeCategory, saveLocation, updateLocationName, updateLocationDescription } = actions
  return bindActionCreators({ addCategory, updateCategory, removeCategory, saveLocation, updateLocationName, updateLocationDescription }, dispatch)
}

const mapCatState = (state, ownProps) => {
  // const category = state.newLocation.categories[ownProps.cuid]
  return {
    items: state.newLocation.items.filter(item => {
      return item.categoryCuid === ownProps.cuid
    })
  }
}

const mapCatDispatch = dispatch => {
  const { updateCategory, removeCategory, addItem } = actions
  return bindActionCreators({ updateCategory, removeCategory, addItem }, dispatch)
}

const mapItemState = (state, ownProps) => {
  return { options: state.newLocation.options.filter(option => option.itemCuid === ownProps.cuid) }
}

const mapItemDispatch = dispatch => {
  const { updateItem, addOption, removeItem } = actions
  return bindActionCreators({ updateItem, addOption, removeItem }, dispatch)
}

const mapOptionDispatch = dispatch => {
  const { updateOption, removeOption } = actions
  return bindActionCreators({ updateOption, removeOption }, dispatch)
}

Category = connect(mapCatState, mapCatDispatch)(Category)

Item = connect(mapItemState, mapItemDispatch)(Item)

Option = connect(null, mapOptionDispatch)(Option)

export default connect(mapState, mapDispatch)(LocationNew)

//#endregion