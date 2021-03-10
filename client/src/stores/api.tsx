import React, { createContext, useContext, useState } from 'react'

import { Client as APIClient } from '../lib/api'

interface APIState {
  initing: boolean;
  isAuthed: boolean;
  client: APIClient;
}

interface APIMutations {
  checkAuthCode: (codeParam: string, stateParam: string) => Promise<void>;
}

const APIContext = createContext({} as APIState)
const APIMutationContext = createContext({} as APIMutations)

export const APIProvider: React.FC = ({ children }) => {
  const [state, setState] = useState({
    initing: true,
    isAuthed: false,
    client: new APIClient(),
  })

  const refreshToken = async (client: APIClient) => {
    const expiresIn = await client.refreshTokens()
    window.setTimeout(() => { refreshToken(client) }, (expiresIn - 30) * 1000)
  }

  const checkAuthCode = (codeParam: string, stateParam: string): Promise<void> => {
    const { client } = state
    return client.checkAuthCode(codeParam, stateParam)
      .then((expiresIn: number) => {
        setState({
          ...state,
          isAuthed: true,
        })
        window.setTimeout(() => { refreshToken(client) }, (expiresIn - 30) * 1000)
      })
  }

  return (
    <APIContext.Provider value={state}>
      <APIMutationContext.Provider value={{
        checkAuthCode,
      }}>
        {children}
      </APIMutationContext.Provider>
    </APIContext.Provider>
  )
}

export const useAPI = (): APIState => { return useContext(APIContext) }
export const useAPIMutations = (): APIMutations => { return useContext(APIMutationContext) }
