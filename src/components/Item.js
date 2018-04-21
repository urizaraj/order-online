import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'
import cuid from 'cuid'
import { toggleActiveItem } from '../actions/activeItemActions'
import { addOrderItem } from '../actions/orderActions'

const Item = props => {
  const detailsProps = {
    options: props.options,
    addOrderItem: props.addOrderItem,
    item: {
      id: props.id,
      name: props.name,
      price: props.price,
    }
  }

  return (
    <div className='mb-3' >
      <ChevButton onClick={() => props.toggleActiveItem(props.active, props.id)} /> {props.name}
      {props.active && <Details {...detailsProps} />}
    </div>
  )
}

// const Details = props => (
//   <div>
//     <div>
//       {props.options.map(option => {
//         const newProps = { option, handleOptionSelect: props.handleOptionSelect }
//         return props.selectedOptions.includes(option) ? SelectedOption(newProps) : Option(newProps)
//       })}
//     </div>
//     <Button handleAddItem={props.handleAddItem} id={props.id} />
//   </div>
// )

const Details = props => {
  return (
    <div>
      {props.options.map(option => <div>{option.name}</div>)}
      <Button handleAddItem={ () => props.addOrderItem(props.item) } />
    </div>
  )
}

const ChevButton = ({ onClick }) => (
  <button className="btn btn-primary" {...{ onClick }} ><Icon icon='chevron-down' /></button>
)

const Button = props => (
  <button className="btn btn-primary" onClick={ props.handleAddItem } >
    <Icon icon='plus' /> Add to Order
  </button>
)

const Option = props => {
  return (
    <div onClick={() => props.handleOptionSelect(props.option)} className='p-3 d-inline-block' >{props.option.name}</div>
  )
}

const SelectedOption = props => {
  return (
    <div onClick={() => props.handleOptionSelect(props.option)} className='p-3 d-inline-block bg-primary text-light' >{props.option.name}</div>
  )
}

const mapStateToProps = (state, own) => {
  const active = state.activeItem.item === own.id

  return { active }
}

const mapDispatchToProps = dispatch => {
  const actions = { toggleActiveItem, addOrderItem }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)