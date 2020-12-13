import Container from '@material-ui/core/Container'

import React from 'react'

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => (
  <Container>{props.children!}</Container>
)

export default Layout
