import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card as CardMui, CardContent } from '@material-ui/core';

type CardProps = {
  children: object;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
})

const Card = ({ children }: CardProps) => {
  const classes = useStyles();

  return (
    <>
      <CardMui className={classes.root}>
        <CardContent>
          {children}
        </CardContent>
      </CardMui>
    </>
  )
}

export default Card
