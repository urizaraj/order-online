import React from 'react'

export function createDiv(type) {
  return props => {
    const { opt, children, ...other } = props
    const result = [type, opt].join(' ')
    return (
      <div className={result} {...other}>
        {children}
      </div>
    )
  }
}