import { SupportedChainId } from 'constants/chains'
import useHttpLocations from 'hooks/useHttpLocations'
import { useMemo } from 'react'
import { isAddress } from 'utils'

import CelestiaLogo from '../../assets/images/celestia-logo.png'
import { NATIVE_CHAIN_ID } from '../../constants/tokens'

type Network = 'ethereum' | 'flame-devnet' | 'flame-testnet'

export function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.FLAME_DEVNET:
      return 'flame-devnet'
    case SupportedChainId.FLAME_TESTNET:
      return 'flame-testnet'
    default:
      return 'ethereum'
  }
}

export function getNativeLogoURI(_chainId: SupportedChainId = SupportedChainId.MAINNET): string {
  return CelestiaLogo
}

export function importTokenLogoFromAssets(networkName: string, address: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logo = require(`../../assets/token-logos/${networkName}/${address}.png`)
    return logo.default
  } catch (error) {
    console.warn(`Local token logo not found for ${address} on ${networkName}`)
    return undefined
  }
}

function getTokenLogoURI(address: string, chainId: SupportedChainId = SupportedChainId.MAINNET): string | void {
  const networkName = chainIdToNetworkName(chainId)
  const networksWithUrls: SupportedChainId[] = []
  if (networksWithUrls.includes(chainId)) {
    // Try to import the local image
    const localLogoURI = importTokenLogoFromAssets(networkName, address)
    if (localLogoURI) {
      return localLogoURI
    }
    // Fallback to remote URL if local import fails
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
  }
}

export default function useCurrencyLogoURIs(
  currency:
    | {
        isNative?: boolean
        isToken?: boolean
        address?: string
        chainId: number
        logoURI?: string | null
      }
    | null
    | undefined
): string[] {
  const locations = useHttpLocations(currency?.logoURI)
  return useMemo(() => {
    const logoURIs = [...locations]
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId))
      } else if (currency.isToken || currency.address) {
        const checksummedAddress = isAddress(currency.address)
        const logoURI = checksummedAddress && getTokenLogoURI(checksummedAddress, currency.chainId)
        if (logoURI) {
          logoURIs.push(logoURI)
        }
      }
    }
    return logoURIs
  }, [currency, locations])
}
