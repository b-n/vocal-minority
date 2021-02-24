import React, { createContext, useContext, useState } from 'react'

import { Allocation } from 'src/interfaces/allocation'

import { useAPI } from './api'

export interface AllocationState {
  currentAllocation?: Allocation;
}

export interface AllocationMutations {
  loadNext: () => Promise<void>;
  loadAllocation: (id: string) => Promise<void>;
}

const AllocationContext = createContext({} as AllocationState)
const AllocationMutationContext = createContext({} as AllocationMutations)

export const AllocationProvider: React.FC = ({ children }) => {
  const { client } = useAPI()
  const [state, setState] = useState({})

  const loadNext = () => {
    return client.getAllocations()
      .then((response) => {
        loadAllocation(response[0])
      })
  }

  const loadAllocation = (tweetId: string) => {
    return client.getAllocation(tweetId)
      .then(response => { setState(response) })
  }

  return (
    <AllocationContext.Provider value={state}>
      <AllocationMutationContext.Provider value={{
        loadNext,
        loadAllocation,
      }}>
        {children}
      </AllocationMutationContext.Provider>
    </AllocationContext.Provider>
  )
}

export const useAllocation = (): AllocationState => { return useContext(AllocationContext) }
export const useAllocationMutations = (): AllocationMutations => { return useContext(AllocationMutationContext) }
