import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles({
  root: {},
})

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const classes = useStyles()
  return <Container className={classes.root}>{props.children!}</Container>
}

export default Layout
