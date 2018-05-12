import React from 'react'
import pick from 'lodash/pick'
import keys from 'lodash/keys'
import compact from 'lodash/compact'

function finder(one) {
  return function (two) {
    return keys(pick(one, two))[0]
  }
}

function comp(value) {
  if (value) {
    return compact(['btn', value]).join('-')
  } else {
    return ''
  }
}

export const Btn = props => {
  const ff = finder(props)

  const color = ff(['primary', 'secondary', 'success', 'danger', 'link'])

  const outline = ff('outline')

  const type = compact(['btn', outline, color]).join('-')

  const size = comp(ff(['sm', 'lg']))

  const block = comp(ff('block'))

  const result = ['btn', type, size, block, props.opt].join(' ')

  return (
    <button
      onClick={props.onClick}
      className={result} >
      {props.children}
    </button>
  )
}