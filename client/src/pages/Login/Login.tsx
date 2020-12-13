import React, { useState, useEffect } from 'react'

import { Layout } from '../common'

interface AuthURLProps {
  name: string;
  url: string;
}

const AuthURL: React.FC<AuthURLProps> = ({ name, url }) => (
  <a href={url} key={name}>{name}</a>
)

const Login: React.FC = () => {
  const [authURLs, setAuthURLs] = useState<JSX.Element[]>([])

  // TODO: Very hack, just POC
  useEffect(() => {
    fetch('http://localhost:3000/dev/auth/urls')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setAuthURLs(
          Object.keys(response).reduce((acc, cur: string) => {
            acc.push((<AuthURL name={cur} url={response[cur]} />))
            return acc
          }, [] as JSX.Element[])
        )
      })
  }, [])
  return (
    <Layout>
      Magic
      <div>
        {authURLs && authURLs.map(url => url)}
      </div>
    </Layout>
  )
}

export default Login
