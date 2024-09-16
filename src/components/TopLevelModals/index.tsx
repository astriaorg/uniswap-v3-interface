import { lazy } from 'react'

const TransactionCompleteModal = lazy(() => import('nft/components/collection/TransactionCompleteModal'))

export default function TopLevelModals() {
  return (
    <>
      <TransactionCompleteModal />
    </>
  )
}
