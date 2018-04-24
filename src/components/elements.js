import React from 'react'

export const DFlex = props => {
  let className = 'd-flex '
  if (props.opt) {
    className += props.opt
  }
  return (
    <div {...{ className }} >
      {props.children}
    </div>
  )
}

export const Row = props => {
  let className = 'row '
  if (props.opt) {
    className += props.opt
  }
  return (
    <div {...{ className }} >
      {props.children}
    </div>
  )
}

export const Col = props => {
  // const className = ['col', (props.size || '')].join('-') + ' ' + props.opt
  let className = 'col'
  if (props.size) {
    className += '-' + props.size
  }

  if (props.opt) {
    className += ' ' + props.opt
  }

  return (
    <div {...{ className }} >
      {props.children}
    </div>
  )
}