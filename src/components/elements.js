import React from 'react'

function div(type) {
  return props => {
    let className = type

    if (props.opt) {
      className += props.opt
    }

    const { opt, ...other } = props
    return (
      <div {...{ className }} {...other} >
        {props.children}
      </div>
    )
  }
}

export const DFlex = props => {
  let className = 'd-flex '
  if (props.opt) {
    className += props.opt
  }

  if (props.center) {
    className += ' align-items-center'
  }
  const { opt, ...other } = props
  return (
    <div {...{ className }} {...other} >
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
    <div {...{ className }} {...other} >
      {props.children}
    </div>
  )
}

export const BCol = props => {
  const {size, opt, ...other} = props

  let className = 'col'
  if (size) {
    className += '-' + size
  }

  if (opt) {
    className += ' ' + opt
  }

  return (
    <div className={className} {...other} >
      {props.children}
    </div>
  )
}