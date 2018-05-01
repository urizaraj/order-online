import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from '@fortawesome/react-fontawesome'
// import cuid from 'cuid'
import { toggleActiveItem } from '../../actions/activeItemActions'
import { addOrderItem } from '../../actions/orderActions'

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
      <div className='' >
        <ChevButton onClick={() => props.toggleActiveItem(props.active, props.id)} /> {props.name}
      </div>
      {props.active && <Details {...detailsProps} />}
    </div>
  )
}

const ChevButton = ({ onClick }) => (
  <button className="btn btn-primary" {...{ onClick }} ><Icon icon='chevron-down' /></button>
)

class Details extends Component {
  constructor() {
    super()

    this.state = {
      selectedOptions: [],
      text: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    const { addOrderItem, item, options } = this.props
    const selectedOptions = this.state.selectedOptions
    return (
      <div className='mt-2' >
        <OptionList {...{options, handleClick: this.handleClick, selectedOptions}} />

        <div className='mb-3 mt-2' >
          <small>Special Instructions: </small>
          <input type='text' value={this.state.text} onChange={this.handleChange} className='form-control form-control-sm' />
        </div>

        <Button handleAddItem={() => addOrderItem(item, selectedOptions, this.state.text)} />
      </div>
    )
  }

  handleClick(option) {
    const selectedOptions = this.state.selectedOptions
    if (selectedOptions.includes(option)) {
      this.setState({
        selectedOptions: selectedOptions.filter(o => o !== option)
      })
    } else {
      this.setState({
        selectedOptions: [...selectedOptions, option]
      })
    }
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }
}

const OptionList = props => {
  return props.options.map(option => {
    const selected = props.selectedOptions.includes(option)
    const handleClick = props.handleClick
    return (
      <Option key={option.id} {...{ option, handleClick, selected }} />
    )
  })
}

const Option = props => {
  let className = 'p-2 d-inline-block'
  if (props.selected) { className += ' bg-primary text-light' }

  const params = {
    onClick: () => props.handleClick(props.option),
    className
  }

  return <div {...params}> <Icon icon={props.selected ? 'check' : 'plus'} fixedWidth /> {props.option.name} - ${props.option.price} </div>
}

const Button = props => (
  <button className="btn btn-primary" onClick={props.handleAddItem} >
    <Icon icon='plus' /> Add to Order
  </button>
)

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
