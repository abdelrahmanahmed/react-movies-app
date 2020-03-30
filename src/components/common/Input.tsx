import React,{useEffect} from 'react';
import { createStyles, makeStyles, Theme, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Input = ({ onChange, value }: any) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField value={value} onChange={onChange} id="standard-basic" label="Search" />
    </form>
  );
}

export default Input;