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

class Details extends Component {
  constructor() {
    super()

    this.state = {
      selectedOptions: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const { addOrderItem, item, options } = this.props
    return (
      <div>
        <OptionList {...{options, handleClick: this.handleClick, selectedOptions: this.state.selectedOptions}} />
        <Button handleAddItem={() => addOrderItem(item)} />
      </div>
    )
  }

  handleClick(option) {
    this.setState({
      selectedOptions: [...this.state.selectedOptions, option]
    })
  }
}

const OptionList = props => {
  return props.options.map(option => {
    const selected = props.selectedOptions.includes(option)
    const handleClick = props.handleClick
    return (
      <Option {...{ option, handleClick, selected }} />
    )
  })
}

const ChevButton = ({ onClick }) => (
  <button className="btn btn-primary" {...{ onClick }} ><Icon icon='chevron-down' /></button>
)

const Button = props => (
  <button className="btn btn-primary" onClick={props.handleAddItem} >
    <Icon icon='plus' /> Add to Order
  </button>
)

const Option = props => {
  let className = 'p-3 d-inline-block'
  if (props.selected) { className += ' bg-primary text-light' }

  const params = {
    onClick: () => props.handleClick(props.option),
    className
  }

  return (
    <div {...params}> {props.option.name} </div>
  )
}

// connect to store

const mapStateToProps = (state, own) => {
  const active = state.activeItem.item === own.id

  return { active }
}

const mapDispatchToProps = dispatch => {
  const actions = { toggleActiveItem, addOrderItem }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)