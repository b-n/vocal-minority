import React, { useEffect } from 'react'

import Layout from 'src/pages/common/Layout'

import { useAllocation, useAllocationMutations } from 'src/stores/allocation'

// import Tweet from 'src/pages/common/Tweet'

const Rate: React.FC = () => {
  const { currentAllocation } = useAllocation()
  const { loadNext } = useAllocationMutations()

  useEffect(() => {
    if (currentAllocation == null) {
      loadNext()
    }
  }, [currentAllocation, loadNext])

  return (
    <Layout>

    </Layout>
  )
}

export default Rate
