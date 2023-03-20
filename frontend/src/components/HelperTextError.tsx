import React from 'react';

import {
  FormHelperText
} from '@mui/material';

const HelperText = (props) => {
  return (
    <FormHelperText
      sx = {{
        'color': '#e46a76',
        'text-align': 'left',
        'margin-top': '3px',
        'margin-right': '14px',
        'margin-bottom': 0,
        'margin-left': '14px'
      }}
    >
      {props.children}
    </FormHelperText>
  );
};

export default HelperText;
