import React, { useState } from 'react';
import { Input, InputProps } from './Input.component';
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

export const Wizard: React.FC<InputProps> = ({
  config
}) => {
  const { classes } = useStyles();
  const [_, forceRender] = useState(0);
  const [answer, setAnswer] = useState('');

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    config.styles.fontFamily.set(event.target.value)
    forceRender(prev => prev + 1);
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
