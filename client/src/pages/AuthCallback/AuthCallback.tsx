import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useAPIMutations } from 'src/stores/api'

interface PageParams {
  state: string;
  code: string;
}

const AuthCallback: React.FC = () => {
  const { checkAuthCode } = useAPIMutations()
  const history = useHistory()
  const { state, code } = useParams<PageParams>()
  const [message, setMessage] = useState('Authorizing...')

  useEffect(() => {
    if (!state || !code) {
      setMessage('Could not login')
      console.log(state, code)
      // history.push('/login?message=Fail')
      return
    }
    checkAuthCode(code, state)
      .then(() => {
        setMessage('Authorized')
        history.push('/')
      })
  }, [history, state, code, checkAuthCode])

  return (
    <div>{message}</div>
  )
}

export default AuthCallback
