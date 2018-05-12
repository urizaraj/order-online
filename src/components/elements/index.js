import React, { cloneElement } from 'react'
import Icon from '@fortawesome/react-fontawesome'
import compact from 'lodash/compact'

import { Btn } from './Btn'
export { Btn }
export * from './formComponents'

export const DFlex = props => {
  const { opt, center, children, ...other } = props

  let className = 'd-flex '
  if (opt) {
    className += opt
  }

  if (center) {
    className += ' align-items-center'
  }
  return (
    <div className={className} {...other}>
      {children}
    </div>
  )
}

export const Row = props => {
  const { opt, children, ...other } = props
  let className = 'row '
  if (opt) {
    className += opt
  }
  return (
    <div className={className} {...other}>
      {children}
    </div>
  )
}

export const BCol = props => {
  const { size, opt, children, ...other } = props

  let className = 'col'
  if (size) {
    className += '-' + size
  }

  if (opt) {
    className += ' ' + opt
  }

  return (
    <div className={className} {...other}>
      {children}
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

export const Checkbox = props => {
  const { children, ...other } = props
  const style = {
    position: 'absolute',
    opacity: 0
  }
  return (
    <label>
      <input type="checkbox" {...other} style={style} />
      {children}
    </label>
  )
}

export const Nav = props => {
  let i = 0
  const children = compact(props.children)
  return (
    <nav className="nav nav-pills">
      {children.map(link => {
        return cloneElement(link, { className: 'nav-item nav-link', key: ++i })
      })}
    </nav>
  )
}

export const Pagination = props => {
  return (
    <div>
      <Btn primary onClick={props.prevPage} disabled={props.page < 2}>
        <Icon icon="angle-left" /> Prev
      </Btn>

      <Btn primary>{props.page}</Btn>

      <Btn primary onClick={props.nextPage}>
        Next <Icon icon="angle-right" />
      </Btn>
    </div>
  )
}
