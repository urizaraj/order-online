import React from 'react'

export const DFlex = props => {
  const className = 'd-flex ' + props.opt
  return (
    <div {...{ className }} >
      {props.children}
    </div>
  )
}

export const Row = props => {
  const className = 'row ' + props.opt
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