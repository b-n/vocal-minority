import Grid from '@material-ui/core/Grid'
import { Variant } from '@material-ui/core/styles/createTypography'
import Typography from '@material-ui/core/Typography'
import React from 'react'

interface HeaderProps {
  variant?: Variant;
  className: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeaderProps> = ({ variant = 'h3', className, children }) => {
  return (
    <Grid item className={className}>
      <Typography variant={variant}>
        {children}
      </Typography>
    </Grid>
  )
}

export default Heading
