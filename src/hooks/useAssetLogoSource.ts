import { chainIdToNetworkName, getNativeLogoURI, importTokenLogoFromAssets } from 'lib/hooks/useCurrencyLogoURIs'
import uriToHttp from 'lib/utils/uriToHttp'
import { isAddress } from 'utils'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

// Converts uri's into fetchable urls
function parseLogoSources(uris: string[]) {
  const urls: string[] = []
  uris.forEach((uri) => urls.push(...uriToHttp(uri)))
  return urls
}

// Parses uri's, favors non-coingecko images, and improves coingecko logo quality
function prioritizeLogoSources(uris: string[]) {
  const parsedUris = uris.map((uri) => uriToHttp(uri)).flat(1)
  const preferredUris: string[] = []

  // Consolidate duplicate coingecko urls into one fallback source
  let coingeckoUrl: string | undefined = undefined

  parsedUris.forEach((uri) => {
    if (uri.startsWith('https://assets.coingecko')) {
      if (!coingeckoUrl) {
        coingeckoUrl = uri.replace(/small|thumb/g, 'large')
      }
    } else {
      preferredUris.push(uri)
    }
  })
  // Places coingecko urls in the back of the source array
  return coingeckoUrl ? [...preferredUris, coingeckoUrl] : preferredUris
}

function getInitialUrl(address?: string | null, chainId?: number | null, isNative?: boolean) {
  if (chainId && isNative) return getNativeLogoURI(chainId)

  const networkName = chainId ? chainIdToNetworkName(chainId) : 'ethereum'
  const checksummedAddress = isAddress(address)
  if (checksummedAddress) {
    // Try to import the local image
    const localLogoURI = importTokenLogoFromAssets(networkName, checksummedAddress)
    if (localLogoURI) {
      return localLogoURI
    }
    return undefined
  } else {
    return undefined
  }
}

export default function useAssetLogoSource(
  address?: string | null,
  chainId?: number | null,
  isNative?: boolean,
  backupImg?: string
): string | undefined {
  return getInitialUrl(address, chainId, isNative) || backupImg
}
