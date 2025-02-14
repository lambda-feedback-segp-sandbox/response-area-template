import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from '@lambda-feedback-segp-sandbox/styles'
import React from 'react'
import { Stylable } from '../typesReact'

interface DialogToolbarProps extends Stylable {
  children?: JSX.Element | JSX.Element[]
}

export const DialogToolbar: React.FC<DialogToolbarProps> = props => {
  const { children, className } = props
  const { classes, cx } = useStyles()
  return (
    <Toolbar className={cx(className, classes.toolbar)}>{children}</Toolbar>
  )
}

const useStyles = makeStyles()(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    minHeight: theme.spacing(5),
    justifyContent: 'flex-end',
    width: '100%',
    overflowX: 'scroll',
  },
}))
