import { style } from '@vanilla-extract/css'

import { subhead } from '../../nft/css/common.css'
import { sprinkles, vars } from '../../nft/css/sprinkles.css'

export const logoContainer = style([
  sprinkles({
    display: 'flex',
    marginRight: { sm: '12', xxl: '20' },
    alignItems: 'center',
    cursor: 'pointer',
  }),
])

export const logo = style([
  sprinkles({
    display: 'block',
    color: 'textPrimary',
  }),
])

export const baseSideContainer = style([
  sprinkles({
    display: 'flex',
    width: 'full',
    flex: '1',
    flexShrink: '2',
  }),
])

export const leftSideContainer = style([
  baseSideContainer,
  sprinkles({
    justifyContent: 'flex-start',
  }),
  {
    alignItems: 'center',
  },
])

export const middleContainer = style([
  sprinkles({
    flex: '1',
    flexShrink: '1',
    justifyContent: { lg: 'flex-end', xl: 'center' },
    display: { sm: 'none', xl: 'flex' },
    alignItems: 'flex-start',
  }),
])

export const rightSideContainer = style([
  baseSideContainer,
  sprinkles({
    justifyContent: 'flex-end',
  }),
])

const baseMenuItem = style([
  subhead,
  sprinkles({
    paddingY: '8',
    paddingX: '16',
    marginY: '4',
    borderRadius: '0',
    transition: '250',
    height: 'min',
    width: 'full',
    textAlign: 'center',
  }),
  {
    fontFamily: 'NB Akademie Mono, monospace',
    fontWeight: '500',
    fontSize: '16px',
    textTransform: 'uppercase',
    borderBottom: '4px solid transparent',
    lineHeight: '24px',
    textDecoration: 'none',
    margin: '0',
    padding: '30px 8px 28px',
    ':hover': {
      // background: vars.color.lightGrayOverlay,
      borderBottomColor: vars.color.textSecondary,
    },
  },
])

export const menuItem = style([
  baseMenuItem,
  sprinkles({
    color: 'textSecondary',
  }),
])

export const activeMenuItem = style([
  baseMenuItem,
  sprinkles({
    color: 'textPrimary',
    background: 'backgroundFloating',
  }),
  {
    borderBottomColor: '#CB513F',
    borderImageSource: 'linear-gradient(83.18deg, #EA9B57 0%, #CB513F 100%)',
    borderImageSlice: '2',
  },
])

export const mobileMenuItem = style([
  menuItem,
  {
    paddingTop: '12px',
    borderBottom: 'none',
    borderTop: '4px solid transparent',
    ':hover': {
      borderTopColor: vars.color.textSecondary,
    },
  },
])

export const activeMobileMenuItem = style([
  activeMenuItem,
  {
    paddingTop: '12px',
    borderBottom: 'none',
    borderTop: '4px solid transparent',
    borderTopColor: '#CB513F',
    borderImageSource: 'linear-gradient(83.18deg, #EA9B57 0%, #CB513F 100%)',
    borderImageSlice: '2',
  },
])
