import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface CheckBoxProps {
    value?: boolean;
    onChange?: (...args: any[]) => void;
}

export default function CheckBox(props: CheckBoxProps) {
    const {value, onChange} = props
  return (
      <Checkbox {...label} color='secondary' checked={value} onChange={onChange}/>
  );
}
