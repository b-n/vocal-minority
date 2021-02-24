import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

import Heading from 'src/components/Heading'
import { useAPI } from 'src/stores/api'

import { AuthProviderButton, AuthProviderProps } from './AuthProvider'

const useStyles = makeStyles({
  loginWrapper: {
    margin: '30px auto 0px auto',
    width: '350px',
    padding: '10px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '0.5em',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const defaultProviders: Array<AuthProviderProps> = [
  { name: 'google', url: '' },
]

const Login: React.FC = () => {
  const classes = useStyles()
  const api = useAPI().client
  const [authProviders, setAuthProviders] = useState<Array<AuthProviderProps>>(defaultProviders)

  useEffect(() => {
    api.getAuthURLS()
      .then(response => {
        setAuthProviders(defaultProviders.map(provider => ({
          ...provider,
          url: response[provider.name],
        })))
      })
  }, [api])

  return (
    <Paper className={classes.loginWrapper} elevation={5}>
      <Heading className={classes.title}>Login</Heading>
      <Box className={classes.buttonWrapper}>
        {
          authProviders && authProviders.filter(a => !!a.url).map(provider => (
            <AuthProviderButton key={provider.name} {...provider} />
          ))
        }
      </Box>
    </Paper>
  )
}

export default Login
