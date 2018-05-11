import Icon from '@fortawesome/react-fontawesome';
import React from 'react';

export const RemoveButton = props => <button className='btn btn-danger' onClick={props.onClick} ><Icon icon='trash' /></button>

export const AddButton = props => (
  <button className='btn btn-success btn-sm mb-3' onClick={props.onClick} disabled={props.disabled} >
    <Icon icon='plus' /> New {props.type}
  </button>
)