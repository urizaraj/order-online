import React, { cloneElement } from 'react'
import Icon from '@fortawesome/react-fontawesome'
import compact from 'lodash/compact'

import { Btn } from './Btn'
export { Btn }

function div(type) {
  return props => {
    let className = type
    const { opt, ...other } = props
    if (opt) {
      className += ' ' + opt
    }
    return (
      <div className={className} {...other}>
        {props.children}
      </div>
    )
  }
}

export const DFlex = props => {
  const { opt, center, ...other } = props

  let className = 'd-flex '
  if (opt) {
    className += opt
  }

  if (center) {
    className += ' align-items-center'
  }
  return (
    <div className={className} {...other}>
      {props.children}
    </div>
  )
}

export const Row = props => {
  const { opt, ...other } = props
  let className = 'row '
  if (opt) {
    className += opt
  }
  return (
    <div className={className} {...other}>
      {props.children}
    </div>
  )
}

export const BCol = props => {
  const { size, opt, ...other } = props

  let className = 'col'
  if (size) {
    className += '-' + size
  }

  if (opt) {
    className += ' ' + opt
  }

  return (
    <div className={className} {...other}>
      {props.children}
    </div>
  )
}

export const Radio = props => {
  const { children, ...other } = props
  const style = {
    position: 'absolute',
    opacity: 0
  }
  return (
    <label>
      <input type="radio" {...other} style={style} />
      {children}
    </label>
  )
}

export const FormRow = div('form-row')
export const FormCheck = div('form-check')
export const FormGroup = div('form-group')
export const FormControl = props => <input {...props} type='text' className='form-control' />

export const Nav = props => {
  let i = 0
  const children = compact(props.children)
  return (
    <nav className='nav nav-pills' >
      {children.map(link => cloneElement(link, { className: 'nav-item nav-link', key: ++i }))}
    </nav>
  )
}

export const Pagination = props => {
  return (
    <div>
      <Btn primary onClick={props.prevPage} disabled={props.page < 2}>
        <Icon icon='angle-left' /> Prev
      </Btn>

      <Btn primary>
        {props.page}
      </Btn>

      <Btn primary onClick={props.nextPage}>
        Next <Icon icon='angle-right' />
      </Btn>
    </div>
  )
}

export const FormPrice = props => {
  return (
    <div className='input-group'>
      <div className='input-group-prepend' >
        <span className='input-group-text' >$</span>
      </div>
      <FormControl {...props} />
    </div>
  )
}