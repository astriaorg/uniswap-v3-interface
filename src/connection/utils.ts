import { Connector } from '@web3-react/types'
import {
  coinbaseWalletConnection,
  ConnectionType,
  gnosisSafeConnection,
  injectedConnection,
  keplrConnection,
  leapConnection,
  networkConnection,
  walletConnectConnection,
} from 'connection'

export function getIsInjected(): boolean {
  return Boolean(window.ethereum)
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false
}

export function getIsCoinbaseWallet(): boolean {
  return window.ethereum?.isCoinbaseWallet ?? false
}

const CONNECTIONS = [
  gnosisSafeConnection,
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
  leapConnection,
  keplrConnection,
]
export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
      case ConnectionType.NETWORK:
        return networkConnection
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection
      case ConnectionType.LEAP:
        return leapConnection
      case ConnectionType.KEPLR:
        return keplrConnection
    }
  }
}

export function getConnectionName(connectionType: ConnectionType, isMetaMask?: boolean) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? 'MetaMask' : 'Browser Wallet'
    case ConnectionType.COINBASE_WALLET:
      return 'Coinbase Wallet'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
    case ConnectionType.NETWORK:
      return 'Network'
    case ConnectionType.GNOSIS_SAFE:
      return 'Gnosis Safe'
    case ConnectionType.LEAP:
      return 'Leap'
    case ConnectionType.KEPLR:
      return 'Keplr'
  }
}
