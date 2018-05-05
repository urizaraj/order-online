import Icon from '@fortawesome/react-fontawesome';
import React, { cloneElement } from 'react';
import { DFlex, Radio } from '../elements';

export const CheckOutFlex = props => {
  return (
    <DFlex opt='justify-content-around text-primary mb-2' >
      {props.children.map(child => cloneElement(child, { name: props.name, onChange: props.onChange }))}
    </DFlex>
  )
}

export const CheckOutRadio = props => {
  const { value, checked, onChange, title, name } = props
  return (
    <Radio name={name} value={value} checked={checked} onChange={onChange} >
      <span className='font-weight-light h2'><Icon icon={checked ? 'dot-circle' : 'circle'} /> {title}</span>
    </Radio>
  )
}