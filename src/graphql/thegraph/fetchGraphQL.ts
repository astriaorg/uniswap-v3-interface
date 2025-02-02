/**
 * Helpful Resources
 * https://github.com/sibelius/create-react-app-relay-modern/blob/master/src/relay/fetchQuery.js
 * https://github.com/relay-tools/relay-compiler-language-typescript/blob/master/example/ts/app.tsx
 */

import { SupportedChainId } from 'constants/chains'
import { Variables } from 'react-relay'
import { GraphQLResponse, ObservableFromValue, RequestParameters } from 'relay-runtime'

import store, { AppState } from '../../state/index'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]: 'https://graph-node.flame.astria.org/subgraphs/name/uniswap-v3',
  [SupportedChainId.FLAME_DEVNET]: 'https://graph-node.evm.dusk-11.devnet.astria.org/subgraphs/name/uniswap-v3',
  [SupportedChainId.FLAME_TESTNET]: 'https://graph-node.flame.dawn-1.astria.org/subgraphs/name/uniswap-v3',
}

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
}

// Define a function that fetches the results of a request (query/mutation/etc)
// and returns its results as a Promise:
const fetchQuery = (params: RequestParameters, variables: Variables): ObservableFromValue<GraphQLResponse> => {
  const chainId = (store.getState() as AppState).application.chainId

  const subgraphUrl =
    chainId && CHAIN_SUBGRAPH_URL[chainId] ? CHAIN_SUBGRAPH_URL[chainId] : CHAIN_SUBGRAPH_URL[SupportedChainId.MAINNET]

  const body = JSON.stringify({
    query: params.text, // GraphQL text from input
    variables,
  })

  const response = fetch(subgraphUrl, {
    method: 'POST',
    headers,
    body,
  }).then((res) => res.json())

  return response
}

export default fetchQuery
