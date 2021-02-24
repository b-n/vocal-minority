import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useAPIMutations } from 'src/stores/api'

const AuthCallback: React.FC = () => {
  const { checkAuthCode } = useAPIMutations()
  const history = useHistory()
  const [message, setMessage] = useState('Authorizing...')
  const searchParams = useLocation().search

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const state = params.get('state')
    const code = params.get('code')
    if (!state || !code) {
      setMessage('Could not login')
      // history.push('/login?message=Fail')
      return
    }
    checkAuthCode(code, state)
      .then(() => {
        setMessage('Authorized')
        history.push('/')
      })
  }, [history, searchParams, checkAuthCode])

  return (
    <div>{message}</div>
  )
}

export default AuthCallback
