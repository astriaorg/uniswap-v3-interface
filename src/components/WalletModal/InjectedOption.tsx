import { Connector } from '@web3-react/types'
import INJECTED_ICON_URL from 'assets/images/arrow-right.svg'
import KEPLR_ICON_URL from 'assets/images/keplr.png'
import LEAP_ICON_URL from 'assets/images/leap.png'
import METAMASK_ICON_URL from 'assets/images/metamask.png'
import { ConnectionType, injectedConnection, keplrConnection, leapConnection } from 'connection'
import { getConnectionName } from 'connection/utils'

import Option from './Option'

const INJECTED_PROPS = {
  color: '#010101',
  icon: INJECTED_ICON_URL,
  id: 'injected',
}

const METAMASK_PROPS = {
  color: '#E8831D',
  icon: METAMASK_ICON_URL,
  id: 'metamask',
}

const LEAP_PROPS = {
  color: '#32da6d',
  icon: LEAP_ICON_URL,
  id: 'leap',
}

const KEPLR_PROPS = {
  color: '#32da6d',
  icon: KEPLR_ICON_URL,
  id: 'keplr',
}

export function InstallMetaMaskOption() {
  return <Option {...METAMASK_PROPS} header="Install MetaMask" link="https://metamask.io/" />
}

export function MetaMaskOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
  const isActive = injectedConnection.hooks.useIsActive()
  return (
    <Option
      {...METAMASK_PROPS}
      isActive={isActive}
      header={getConnectionName(ConnectionType.INJECTED, true)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  )
}

export function InjectedOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
  const isActive = injectedConnection.hooks.useIsActive()
  return (
    <Option
      {...INJECTED_PROPS}
      isActive={isActive}
      header={getConnectionName(ConnectionType.INJECTED, false)}
      onClick={() => tryActivation(injectedConnection.connector)}
    />
  )
}

export function LeapOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
  const isActive = leapConnection.hooks.useIsActive()
  return (
    <Option
      {...LEAP_PROPS}
      isActive={isActive}
      header={getConnectionName(ConnectionType.LEAP, false)}
      onClick={() => tryActivation(leapConnection.connector)}
    />
  )
}

export function KeplrOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
  const isActive = keplrConnection.hooks.useIsActive()
  return (
    <Option
      {...KEPLR_PROPS}
      isActive={isActive}
      header={getConnectionName(ConnectionType.KEPLR, false)}
      onClick={() => tryActivation(keplrConnection.connector)}
    />
  )
}
