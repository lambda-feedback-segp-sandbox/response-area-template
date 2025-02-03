import { makeStyles } from '@lambda-feedback-segp-sandbox/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

import { Input, InputProps } from './Input.component';

export const Wizard: React.FC<InputProps> = ({
  config
}) => {
  const { classes } = useStyles();
  const [answer, setAnswer] = useState('');
  const [, setSelectedFont] = useState(config.styles.fontFamily.get());

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const newFont = event.target.value;
    config.styles.fontFamily.set(newFont);
    setSelectedFont(newFont); // This ensures React detects the change and triggers a re-render
  };


  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="font-select-label">Font</InputLabel>
          <Select
            labelId="font-select-label"
            onChange={handleFontChange}
            value={config.styles.fontFamily.get()}
            label="Font"
          >
            <MenuItem value="Arial" sx={{ fontFamily: 'Arial' }}>Arial</MenuItem>
            <MenuItem value="Courier New" sx={{ fontFamily: 'Courier New' }}>Courier New</MenuItem>
            <MenuItem value="Times New Roman" sx={{ fontFamily: 'Times New Roman' }}>Times New Roman</MenuItem>
            <MenuItem value="Cursive" sx={{ fontFamily: 'Cursive' }}>Cursive</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Input
        handleChange={(val) => setAnswer(val)}
        answer={answer}
        config={config}
      />
    </div>
  );
};

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
}));
