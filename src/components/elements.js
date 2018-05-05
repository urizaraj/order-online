import React from 'react'
import compact from 'lodash/compact'

function div(type) {
  return props => {
    let className = type

    if (props.opt) {
      className += ' ' + props.opt
    }

    const { opt, ...other } = props
    return (
      <div {...{ className }} {...other}>
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
    <div {...{ className }} {...other}>
      {props.children}
    </div>
  )
}

export const Row = props => {
  let className = 'row '
  if (props.opt) {
    className += props.opt
  }
  const { opt, ...other } = props
  return (
    <div {...{ className }} {...other}>
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

export const Btn = props => {
  const { opt, children, ...rest } = props
  const newProps = {
    className: `btn btn-${opt}`,
    ...rest
  }
  return <button {...newProps}>{children}</button>
}

export function classNames(base, options = {}) {
  const one = Object.entries(options).map((key, value) => {
    if (value) return key
  })

  return [base, ...compact(one)].join(' ')
}
